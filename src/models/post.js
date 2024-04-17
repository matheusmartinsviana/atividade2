const database = require('../config/database');
const User = require('./user');

class Post {
    constructor() {
        this.model = database.define('posts', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.Sequelize.STRING
            },
            conteudo: {
                type: database.Sequelize.STRING
            },
            userId: {
                type: database.Sequelize.INTEGER,
                foreignKey: true,
                references: {
                    model: User,
                    key: 'userId'
                }
            }
        })
    }
}

module.exports = (new Post).model;