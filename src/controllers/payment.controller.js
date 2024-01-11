const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();
const { Mpago, Parents, Grade, Estudiante } = require('../config/db')


//console.log("esto es modulo mercadopago")

mercadopago.configure({
  access_token: process.env.ACCESS_TOKE || "",
});

Mercado_Pago.post("/mercadopago", async (req, res) => {
  const producto = req.body;
  const parentid = req.body.parentid
  const estudianteId = req.body.studentId;
  const gradeId = req.body.gradeId;

  console.log("esto me llega por body", req.body)


  console.log("URL DE SOLICITUD MERCADO PAGO",req.path)

  
  try {
    const preference = {
      items: [
        {
          title: producto.title,
          unit_price: producto.unit_price,
          currency_id: "USD",
          quantity: producto.quantity,
        },
        // {
        //   title: Inscripción,
        //   unit_price: 50,
        //   currency_id: "USD",
        //   quantity: 1,
        // },
      ],

      back_urls: {
        success: "http://localhost:5173/viewParent/myProfile",  // cuando es pago exitoso nos regresa al perfil de padre donde realiza el pago 
        failure: "http://localhost:3000/fallo",
      },

      payment_methods: {
        installments: 1,
      },
      
      Notification_url:"https://2167-186-28-102-128.ngrok-free.app/webhook", 
      
      external_reference: `${String(estudianteId)},${String(gradeId)},${String(parentid)}`,

    
      auto_return: "approved",
    
    };

   
                  
    const respuesta = await mercadopago.preferences.create(preference);
    console.log("esto es respuesta de mercadolibre creando preferencia", respuesta);
    console.log("esto es lo que enviamos al json", respuesta.response.init_point)
    console.log("esto es respuesta.response.back_urls.success", respuesta.response.back_urls.success)
    console.log("esto es respuesta.response.date_created", respuesta.response.date_created)
    return res.status(200).json(respuesta.response.init_point );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "error en controllador" });
  }
});

const receiveWebhook = async (req, res) => {
  try {
  
    const payment = req.query;
    console.log("esto es req.query de MP",payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log("esto es data si consigue data.id",data);

      const idtransaccion = data.body.id
      const emailuser = data.body.payer.email
      const descripcion =  data.body.description
      const amountransaccion = data.body.transaction_amount
      const amountschool = data.body.transaction_details.net_received_amount
      const fapro = data.body.date_approved

      const statepaymet = data.body.status
      const statusdetail = data.body.status_detail

      console.log("esto es data.description si consigue data.id",descripcion);
      console.log("esto es id si consigue data.id",idtransaccion);
      console.log("esto es fecha de aprobacion si consigue data.id",fapro);
      console.log("esto es email si consigue data.id",emailuser);
      console.log("esto es estado de compra si consigue data.id",statepaymet);
      console.log("esto es dellate del estado si consigue data.id",statusdetail);
      console.log("esto es monto de la transaccion si consigue data.id",amountransaccion);
      console.log("esto es monto al colegio si consigue data.id",amountschool);
      
      if (data.body.status === "approved"){
        const externalReferenceParts = data.body.external_reference.split(',');
        const estudianteId = externalReferenceParts[0];
        const gradeId = externalReferenceParts[1];

        const parentid = externalReferenceParts[2];
        console.log("esto es parentid id del padre", parentid)

        await updateEstadoPago(estudianteId);
        await updateGradeQuota(gradeId);
        console.log("Estado de pago actualizado para el estudiante con ID:", estudianteId);
        

        let parents = await Parents.findOne({
          where: {
            id: parentid,
          },
        });
  
        let nombreUsuario = "";
        let apellidoUsuario = "";
  
        if (parents) {
          nombreUsuario = parents.name;
          apellidoUsuario = parents.lastName;
        }
  
        console.log(nombreUsuario, apellidoUsuario)
        
        
          await Mpago.create({
          iduser: parentid,
          idtrans: idtransaccion,
          nombreuser: nombreUsuario,
          apellidouser: apellidoUsuario,
          email: emailuser, 
          descripcion: descripcion, 
          monto: amountransaccion, 
          montoschool: amountschool,
          fechPago: fapro,
          status: statepaymet,
          statusdetail: statusdetail
         });
     
      }
        
    }
  

      return res.status(200).json("http://localhost:5173/viewParent/myProfile");

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const updateEstadoPago = async (estudianteId) =>   {

  try {
    const estudiante = await Estudiante.findByPk(estudianteId);

    if (!estudiante) {
      console.log("Estudiante not found with ID:", estudianteId);
      return;
    }

    // Update estadoPago to true
    estudiante.estadoPago = true;
    await estudiante.save();

    console.log("Estado de pago actualizado para el estudiante con ID:", estudianteId);
  
  } catch (error) {
    console.error("Error updating estadoPago:", error.message);
    throw error;
  }
};

const updateGradeQuota = async (gradeId) => {
  try {
    // Get the grade record
    const grade = await Grade.findByPk(gradeId);

    if (!grade) {
      console.log("Grade not found with ID:", gradeId);
      return;
    }

    // Increment the counter
    grade.gradequota += 1;
    await grade.save();

    console.log("Grade quota updated for grade with ID:", gradeId);

    // Check if the quota is reached
    if (grade.gradequota === grade.gradeQuotaLimit) {
      // If the quota is reached, log the details and update the grade state to false
      console.log("Quota reached for grade with ID:", gradeId);
      console.log("Before update - Grade state:", grade.state);

      grade.state = false;
    await grade.save();

      console.log("After update - Grade state set to false for grade with state:", grade.state);
    }

  } catch (error) {
    console.error("Error updating grade quota:", error.message);
    throw error;
  }
};

 module.exports = { Mercado_Pago, receiveWebhook}