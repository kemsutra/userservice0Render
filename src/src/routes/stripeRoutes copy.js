const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";

// Endpoint to create a Stripe Checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    // Debug: Log the incoming request body to see priceId
    console.log("Received request to create checkout session:", req.body);

    const { priceId } = req.body; // Get priceId from the frontend

    // Debug: Log the priceId value
    console.log("Price ID received:", priceId);

    // Create Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      // success_url: `${process.env.YOUR_DOMAIN}/#/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${process.env.YOUR_DOMAIN}/#/cancel`,

      success_url: "http://localhost:4200/",
      //cancel_url: `${http://localhost:4200/}`,
    });

    // Debug: Log session creation response
    console.log("Stripe session created:", session);

    res.json({ id: session.id }); // Send session ID to frontend
  } catch (error) {
    // Debug: Log the error message
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to handle webhook events
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    // Debug: Log the incoming webhook request headers
    console.log("Received webhook event:", req.headers);

    try {
      // Verify webhook signature and parse event
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      // Debug: Log event details after signature verification
      console.log("Stripe webhook event verified:", event);
    } catch (err) {
      // Debug: Log the error if webhook verification fails
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.sendStatus(400); // Respond with 400 on failure
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        // Debug: Log session data when checkout session is completed
        console.log("Checkout session completed:", session);

        break;

      // You can handle other event types here as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Respond with 200 to acknowledge receipt of the event
    res.sendStatus(200);
  }
);

module.exports = router;
