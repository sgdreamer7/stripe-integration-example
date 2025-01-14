import stripeLibrary from 'stripe';
import { stripePrivateAPIKey } from '../../utils/stripe';

const stripe = stripeLibrary(stripePrivateAPIKey);

export default async (subscriptionId, quantity) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    quantity
  });
  return !!subscription;
};