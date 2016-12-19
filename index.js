
var Sequelize = require("sequelize");

var sequelize = new Sequelize('hydra', 'root', 'root', {host: 'localhost', dialect: 'mysql', pool: {
    max: 5,
    min: 0,
    idle: 10000
}});

var Company = sequelize.import(__dirname + "/app/models/company");
// Company.create({
//     company_name: 'Applica'
// }).then(function() {
//     console.log("done");
// });


var Workcell = sequelize.import(__dirname + "/app/models/workcell");
var Machine = sequelize.import(__dirname + "/app/models/machine");


Machine.belongsTo(Workcell);
Workcell.hasMany(Machine);
Workcell.belongsTo(Company);
Company.hasMany(Workcell);


Company.findAll({ include: [ {model: Workcell, include: [Machine]} ] }).then(function(machines) {
    console.log(JSON.stringify(machines))
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
