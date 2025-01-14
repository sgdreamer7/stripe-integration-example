
const isProductionOrStaging = () =>
  ['production'].includes(process.env.NODE_ENV) || ['staging'].includes(process.env.NODE_ENV);

const stripePublishableAPIKey =
  (isProductionOrStaging() && 'pk_live_************************') ||
  'pk_test_N4k1mBQd6gqweAf0PxCkrfTU';

const stripePrivateAPIKey =
  (isProductionOrStaging() && 'sk_live_*********************************') ||
  'sk_test_************************';

const stripeProductId = 'prod_***************';

const stripePlanId = (isProductionOrStaging() && 'plan_*************') || 'plan_***************';

const stripeMaxPlanId = 'plan_**************';

module.exports = {
  stripePublishableAPIKey,
  stripePrivateAPIKey,
  stripeProductId,
  stripePlanId,
  stripeMaxPlanId
};