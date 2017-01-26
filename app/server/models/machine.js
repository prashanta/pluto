/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
    var Machine = sequelize.define("machine", {
        workcellId: DataTypes.INTEGER,
        uuid: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
        code: DataTypes.STRING(50),
        serialNumber: DataTypes.STRING(100),
        model: DataTypes.STRING(100),
        manufacturer: DataTypes.STRING(100),
        description: DataTypes.STRING(2000),
        type: DataTypes.STRING(200),
        active: {type: DataTypes.BOOLEAN, defaultValue: false},
        localIpAddress: DataTypes.STRING(20),
        macAddress: DataTypes.STRING(20)
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
