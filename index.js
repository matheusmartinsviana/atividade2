const express = require('express')
const database = require('./src/config/database')
const UserApi = require('./src/api/UserApi')
const PostApi = require('./src/api/PostApi')

const app = express()
const PORT = 3000
app.use(express.json())


//rotas de usuários
const userApi = new UserApi();
app.get('/users', userApi.listarUsuario);
app.post('/users', userApi.criarUsuario);
app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);

//rotas de postagens
const postApi = new PostApi();
app.get('/posts', postApi.listarPost);
app.post('/posts', postApi.criarPost);
app.put('/posts/:id', postApi.alterarPost);
app.delete('/posts/:id', postApi.deletarPost);

database.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        return database.sync({ force: true });
    })
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    });
