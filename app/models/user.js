/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        companyId: DataTypes.INTEGER,
        uid: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1},
        passwordHash: {type: DataTypes.STRING(300)},
        firstName: DataTypes.STRING(100),
        lastName: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        phone: DataTypes.STRING(100),
        type: DataTypes.ENUM('admin', 'user'),
        active: DataTypes.BOOLEAN
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
