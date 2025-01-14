export default (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  });

  Payment.associate = models => {
    Payment.belongsTo(models.Organization);
  };

  return Payment;
};