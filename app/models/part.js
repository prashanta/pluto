/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var Part = sequelize.define("part", {
        customerId: DataTypes.INTEGER,
        partlNumber: DataTypes.STRING(100),
        description: DataTypes.STRING(200),
        status: DataTypes.INTEGER
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                models.part.belongsTo(models.customer);
            }
        }
    });
    return Part;
}
