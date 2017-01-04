/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {

    var Tenant = sequelize.define("tenant", {
        name: DataTypes.STRING(200),
        address1: DataTypes.STRING(200),
        address2: DataTypes.STRING(200),
        city: DataTypes.STRING(100),
        country: DataTypes.STRING(100),
        postalCode: DataTypes.STRING(100),
        emailDomain: DataTypes.STRING(100),
        website: DataTypes.STRING(200)
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                models.tenant.hasMany(models.workcell);
                models.tenant.hasMany(models.user);
            }
        }
    });

    return Tenant;
}
