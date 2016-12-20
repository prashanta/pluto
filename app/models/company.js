module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.define("company", {
        name: DataTypes.STRING(200),
        address1: DataTypes.STRING(200),
        address2: DataTypes.STRING(200),
        city: DataTypes.STRING(100),
        country: DataTypes.STRING(100),
        postalCode: DataTypes.STRING(100),
        emailDomain: DataTypes.STRING(100),
        website: DataTypes.STRING(200)
    },
    {
        timestamps: true,
        paranoid: true,
        classMethods: {
            associate: function(models) {
                console.log("flag2");
                Company.hasMany(models.workcell);
            }
        }
    });

    return Company;
};
