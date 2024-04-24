const express = require('express')
const database = require('./src/config/database')
const UserApi = require('./src/api/UserApi')
const PostApi = require('./src/api/PostApi')
const Middleware = require('./src/middlewares/validationMiddleware')

const app = express()
const PORT = 3000
app.use(express.json())


const userApi = new UserApi();
const postApi = new PostApi();
const middleware = new Middleware();

//rotas de usuários
// Aplica a validação do token para as rotas abaixo
app.post('/users', middleware.validarUsuario, userApi.criarUsuario);
app.post('/login', userApi.login);
app.use(userApi.validarToken);
app.get('/users', userApi.listarUsuario);
app.get('/users/:id', middleware.validarUserId, userApi.mostrarUsuario);
app.put('/users/:id', middleware.validarUserId, middleware.validarUsuario, userApi.alterarUsuario);
app.delete('/users/:id', middleware.validarUserId, userApi.deletarUsuario);

//rotas de postagens
app.get('/posts', postApi.listarPosts);
app.get('/posts/:id', middleware.validarPostId, postApi.mostrarPost);
app.get('/findPost/:id', middleware.validarPostId, postApi.mostrarUserPosts)
app.post('/posts', middleware.validarPost, postApi.criarPost);
app.put('/posts/:id', middleware.validarPostId, middleware.validarPost, postApi.alterarPost);
app.delete('/posts/:id', middleware.validarUserId, postApi.deletarPost);

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
