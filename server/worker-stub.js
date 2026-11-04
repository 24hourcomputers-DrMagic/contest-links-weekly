// Cloudflare Worker STUB (not deployed). Needs: KV namespace MEMBERS, secrets STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
// Routes: POST /signup {email} -> magic-link/session; POST /entry -> increments used if used<100 or plan active;
// GET /me -> {used, plan}; POST /checkout -> creates Stripe Checkout Session (price_monthly $1 CAD / price_annual $12 CAD);
// POST /stripe-webhook -> verifies signature; on checkout.session.completed / customer.subscription.updated|deleted sets plan.
// NOTE: if sold inside the Google Play app, digital subscriptions must use Google Play Billing instead (see PLAY-STORE-GUIDE.md).
export default { async fetch(req, env) {
  const u = new URL(req.url);
  if (u.pathname === '/me') return Response.json({ used: 0, plan: null, stub: true });
  return new Response('Not implemented (stub)', { status: 501 });
}};
