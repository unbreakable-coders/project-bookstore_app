import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: body.items,
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
