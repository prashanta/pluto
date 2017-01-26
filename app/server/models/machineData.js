/*jshint esversion: 6 */

export default function(sequelize, DataTypes) {
  var MachineData = sequelize.define("machineData", {
    timestamp: DataTypes.DATE,
    machineId: DataTypes.INTEGER,
    command: DataTypes.STRING(20),
    output: DataTypes.STRING(200)
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: 'machine_data'
  });
  return MachineData;
}
