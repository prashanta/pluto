/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        companyId: DataTypes.INTEGER,
        firstName: DataTypes.STRING(100),
        middleName: DataTypes.STRING(100),
        lastName: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        phone: DataTypes.STRING(100),
        userType: DataTypes.ENUM('active', 'inactive')
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                models.user.belongsTo(models.company);
            }
        }
    });
    return User;
}
