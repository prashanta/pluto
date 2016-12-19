module.exports = function(sequelize, DataTypes) {
    return sequelize.define("machine", {
        code: DataTypes.STRING(50),
        serialNumber: DataTypes.STRING(100),
        model: DataTypes.STRING(100),
        manufacturer: DataTypes.STRING(100),
        description: DataTypes.STRING(2000),
        type: DataTypes.STRING(200)
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true
    });
}
