export default function handler(req, res) {
  res.json({
    frontendUrl: process.env.FRONTEND_URL || null,
    stripeKeyExists: Boolean(process.env.STRIPE_SECRET_KEY)
  });
}
