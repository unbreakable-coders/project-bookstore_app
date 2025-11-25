import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
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
    const { amountUAH } = req.body;

    if (!amountUAH || amountUAH <= 0) {
      return res.status(400).json({ error: 'Invalid amountUAH' });
    }

    const frontendUrl =
      process.env.FRONTEND_URL ||
      'https://project-bookstore-app-git-develop-unbreakable-coders.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'uah',
            product_data: { name: 'Bookstore test payment' },
            unit_amount: amountUAH * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${frontendUrl}/dev-preview?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/dev-preview`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe create session error:', error);
    return res.status(500).json({ error: error.message });
  }
}
