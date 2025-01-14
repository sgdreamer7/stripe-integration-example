import db from '../../models';
import stripeService from '../stripe';

const { Organization } = db;

export default async (organizationId, subscriptionId) => {
  const organization = await Organization.findById(organizationId);
  if (organization) {
    const oldSubscription = organization.paid_service;
    organization.update({ paid_service: subscriptionId });
    if (oldSubscription && oldSubscription !== 'free') {
      await stripeService.removeSubscription(oldSubscription);
    }
    return true;
  }
  return false;
};