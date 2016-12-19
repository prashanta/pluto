module.exports = function(sequelize, DataTypes) {
    return sequelize.define("workcell", {
        companyId: DataTypes.INTEGER,
        code: DataTypes.STRING(50),
        name: DataTypes.STRING(200),
        status: DataTypes.ENUM('active', 'inactive'),
        description: DataTypes.STRING(200)
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true
    });
}
