/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var Workcell = sequelize.define("workcell", {
        companyId: DataTypes.INTEGER,
        code: DataTypes.STRING(50),
        name: DataTypes.STRING(200),
        description: DataTypes.STRING(200),
        active: DataTypes.BOOLEAN
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                models.workcell.belongsTo(models.company);
                models.workcell.hasMany(models.machine);
            }
        }
    });
    return Workcell;
}
