import db from '../../models';

const { Organization } = db;

export default async (organizationId) => {
  const organization = await Organization.findById(organizationId);
  if (organization) {
    const employeeQuantity = organization.membersQuantity
    return employeeQuantity;
  }
  return 0;
};