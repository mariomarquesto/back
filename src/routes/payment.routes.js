const { Router } = require("express");

const {Mercado_Pago,receiveWebhook} = require ("../controllers/payment.controller.js")

const router = Router();


router.post("/mercadopago", Mercado_Pago)

router.post("/webhook", receiveWebhook);

//router.get("/success", (req, res) => res.send("Success"));

module.exports = router