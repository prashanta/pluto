module.exports = function(sequelize, DataTypes) {
    return sequelize.define("company", {
        name: DataTypes.TEXT,
        address1: DataTypes.STRING(200),
        address2: DataTypes.STRING(200),
        city: DataTypes.STRING(200),
        country: DataTypes.STRING(200),
        postalCode: DataTypes.STRING(200),
        emailDomain: DataTypes.STRING(200),
        website: DataTypes.STRING(200)
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true
    });
}
