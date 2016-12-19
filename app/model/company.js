module.exports = function(sequelize, DataTypes) {
  return sequelize.define("company", {
    company_id: {DataTypes.INTEGER, primaryKey: true},
    company_name: DataTypes.TEXT,
    address_1: DataTypes.STRING(200),
    address_2: DataTypes.STRING(200),
    city: DataTypes.STRING(200),
    country: DataTypes.STRING(200),
    postal_code: DataTypes.STRING(200),
    email_domain: DataTypes.STRING(200),
    website: DataTypes.STRING(200)
  },
  {
      timestamps: true,
      paranoid: true
  })
}
