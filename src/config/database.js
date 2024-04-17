const Sequelize = require('sequelize');
//const env = require('../../.env'); //maybe another day i gonna do this

const dbName = "atividade2";
const dbUser = "root";
const dbHost = "localhost";
const dbPassword = "";

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword, {
    //passar os dados para o sequelize
    host: dbHost,
    dialect: "mysql",
});

module.exports = sequelize;