/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        companyId: DataTypes.INTEGER,
        code: DataTypes.STRING(50),
        name: DataTypes.STRING(200),
        status: DataTypes.INTEGER
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                models.customer.belongsTo(models.tenant);
                models.customer.hasMany(models.part);
            }
        }
    });
    return Customer;
}
