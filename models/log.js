module.exports = function (sequelize, DataTypes){
    return sequelize.define('log', {
        planetName: DataTypes.STRING,
        description: DataTypes.TEXT,
        habitable: DataTypes.STRING,
        image: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}