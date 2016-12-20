
//var Sequelize = require("sequelize");
//var config = require("./app/config");
//var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.config);

//var Company = sequelize.import(__dirname + "/app/models/company");

var models  = require('./app/models');
// Company.create({
//     company_name: 'Applica'
// }).then(function() {
//     console.log("done");
// });

// var Workcell = sequelize.import(__dirname + "/app/models/workcell");
// var Machine = sequelize.import(__dirname + "/app/models/machine");

// Machine.belongsTo(Workcell);
// Workcell.hasMany(Machine);
// Workcell.belongsTo(Company);
// Company.hasMany(Workcell);
//
//
 models.company.findAll({ include: [ {model: models.workcell, include: [models.machine]} ] }).then(function(result) {
     console.log(JSON.stringify(result));
 });

// Workcell.create({
//     company_id: 1,
//     code: 'TD1',
//     name: 'Some name'
// }).then(function(w1) {
//     console.log(w1.dataValues.workcell_code);
//     Machine.create({
//         workcell_id: 1,
//         code: 'M1',
//         model: 'VF1'
//     }).then(function(w1) {
//         Machine.create({
//             workcell_id: 1,
//             code: 'M1',
//             model: 'VF1'
//         }).then(function(){
//             Workcell.findAll({ include: [ Machine ] }).then(function(machines) {
//                 console.log(JSON.stringify(machines))
//             });
//         });
//     });
// });
