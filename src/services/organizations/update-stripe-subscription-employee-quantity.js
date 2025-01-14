import db from '../../models';
import stripeService from '../stripe';
import organizationService from '.';

const { Organization } = db;

export default async (organizationId) => {
  const organization = await Organization.findById(organizationId);
  if (organization) {
    const oldSubscription = organization.paid_service;
    const membersQuantity = await organizationService.getMembersQuantity(
      organizationId
    );
    if (oldSubscription && oldSubscription !== 'free') {
      return stripeService.updateSubscriptionQuantity(
        oldSubscription,
        membersQuantity
      );
    }
  }
  return false;
};