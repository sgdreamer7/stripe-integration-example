import db from '../../models';

const { Organization } = db;

export default async (organizationId) => {
  const organization = await Organization.findById(organizationId);

  return (
    (organization && organization.paid_service !== 'free' && organization.paid_service) || null
  );
};