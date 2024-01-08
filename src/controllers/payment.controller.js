const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();


//console.log("esto es modulo mercadopago")

mercadopago.configure({
  access_token: process.env.ACCESS_TOKE || "",
});

Mercado_Pago.post("/mercadopago", async (req, res) => {
  const producto = req.body;

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
      
      Notification_url:"https://8cb3-190-22-61-2.ngrok-free.app/webhook"
    
      //auto_return: "approved",
    
    };
                  
    const respuesta = await mercadopago.preferences.create(preference);
    console.log("esto es respuesta de mercadolibre creando preferencia", respuesta);
    console.log("esto es lo que enviamos al json", respuesta.response.init_point)
    res.status(200).json(respuesta.response.init_point);
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


    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

 module.exports = { Mercado_Pago, receiveWebhook}
