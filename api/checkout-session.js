import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.error('[Stripe] STRIPE_SECRET_KEY is missing in environment');
    return res
      .status(500)
      .json({ error: 'Stripe configuration error (no secret key)' });
  }

  const stripe = new Stripe(secretKey);

  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: 'session_id is required' });
    }

    const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
    const session = await stripe.checkout.sessions.retrieve(id);

    return res.status(200).json({
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error('Stripe retrieve error:', error);
    return res.status(500).json({ error: error.message });
  }
}
