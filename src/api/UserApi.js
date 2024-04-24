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

    async mostrarUsuario(req, res) {
        try {
            const { id } = req.params;
            const user = await UserController.buscarPorId(id);
            if (!user) {
                res.status(404).send({ error: 'Usuário não encontrado' });
            }
            res.send(user);
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

    // Método para validar o token
    async validarToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await UserController.validarToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ message: 'Você deve estar logado para realizar esta operação',error: error.message })
        }
    }

    // Método para login
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await UserController.login(email, senha);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = UserApi;