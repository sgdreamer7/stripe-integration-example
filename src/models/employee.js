export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    is_activated: { type: DataTypes.BOOLEAN },
    real_name: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING
    }
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Organization, {
      as: 'organization',
      foreignKey: 'organization_id',
      allowNull: false
    });
  };
  Employee.findById = async (id, query) => {
    const { where: whereClause, attributes } = query || {};
    let newWhereClause = Object.assign({}, whereClause);
    delete newWhereClause.id;
    newWhereClause = Object.assign(
      newWhereClause,
      { id }
    );
    const newAttributes = Object.assign({}, attributes);
    if (attributes && !attributes.find(attribute => attribute === 'organization_id'))
      attributes.push('organization_id');
    let newQuery = Object.assign({}, query);
    newQuery = Object.assign(newQuery, {
      where: newWhereClause,
      attributes: newAttributes
    });
    return Employee.findOne(newQuery);
  };

  return Employee;
};