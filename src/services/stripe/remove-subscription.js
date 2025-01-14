import stripeLibrary from 'stripe';
import { stripePrivateAPIKey } from '../../utils/stripe';

const stripe = stripeLibrary(stripePrivateAPIKey);

export default async (subscriptionId) => {
  const subscription = await stripe.subscriptions.del(subscriptionId);
  return !!subscription;
};