import 'server-only'

import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY

if (stripeSecret === undefined) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.stripeSecret!)