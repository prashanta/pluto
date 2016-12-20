module.exports = function(sequelize, DataTypes) {
    var Workcell = sequelize.define("workcell", {
        companyId: DataTypes.INTEGER,
        code: DataTypes.STRING(50),
        name: DataTypes.STRING(200),
        description: DataTypes.STRING(200),
        status: DataTypes.ENUM('active', 'inactive')
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                Workcell.belongsTo(models.company);
                Workcell.hasMany(models.machine);
            }
        }
    });
    return Workcell;
};
