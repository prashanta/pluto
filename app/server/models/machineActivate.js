/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var MachineActivate = sequelize.define("machineActivate", {
        machineId: DataTypes.INTEGER,
        code: DataTypes.INTEGER,
        expiresOn: DataTypes.DATE
    },
    {
        timestamps: true,
        paranoid: true,
        tableName: 'machine_activate'
    });
    return MachineActivate;
}
