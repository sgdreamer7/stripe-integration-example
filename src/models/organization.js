export default (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email_domain: { type: DataTypes.STRING },
    paid_service: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  });

  Organization.associate = models => {
    Organization.hasMany(models.Employee, {
      as: 'Employees',
      foreignKey: 'organization_id'
    });
    Organization.hasMany(models.Payment);
  };

  Organization.findById = async (id, query) => {
    const { where: whereClause } = query || {};
    let newWhereClause = Object.assign({}, whereClause);
    delete newWhereClause.id;
    newWhereClause = Object.assign(
      newWhereClause,
      (Number.isInteger(id) && { id }) || { id: Number(id) }
    );
    let newQuery = Object.assign({}, query);
    newQuery = Object.assign(newQuery, { where: newWhereClause });
    return Organization.findOne(newQuery);
  };

  return Organization;
};