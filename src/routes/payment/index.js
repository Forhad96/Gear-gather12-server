const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res, next) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
