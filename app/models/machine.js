/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var Machine = sequelize.define("machine", {
        workcellId: DataTypes.INTEGER,
        code: DataTypes.STRING(50),
        serialNumber: DataTypes.STRING(100),
        model: DataTypes.STRING(100),
        manufacturer: DataTypes.STRING(100),
        description: DataTypes.STRING(2000),
        type: DataTypes.STRING(200),
        active: DataTypes.BOOLEAN
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                models.machine.belongsTo(models.workcell);
            }
        }
    });
    return Machine;
}
