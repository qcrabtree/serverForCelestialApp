const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('The Database be connected, Matey')
    },
    function(err){
        console.log(err)
    }
);



module.exports = sequelize;