const UserController = require('../controllers/user');

class UserApi {

    async listarUsuario(req, res) {
        try {
            const users = await UserController.listarUsuarios();
            res.send(users);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async criarUsuario(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const user = await UserController.criarUsuario(nome, email, senha);
            res.send(user);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async alterarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            const user = await UserController.alterarUsuario(id, nome, email, senha);
            res.send(user);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            await UserController.deletarUsuario(id);
            res.send();
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

module.exports = UserApi;