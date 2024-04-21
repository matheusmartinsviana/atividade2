const PostController = require('../controllers/post');
const UserController = require('../controllers/user');

class Middleware {
    async validarPost(req, res, next) {
        const { titulo, conteudo, userId } = req.body;
        if (!titulo || !conteudo || !userId) {
            return res.status(400).send({ error: 'Os campos obrigatórios não foram preenchidos.' });
        } else if (typeof titulo !== 'string' || typeof conteudo !== 'string' || typeof userId !== 'number') {
            return res.status(400).send({ error: 'Os campos não estão no formato correto.' });
        }

        const user = await UserController.buscarPorId(userId);
        if (!user) {
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }

        next();
    }

    async validarUsuario(req, res, next) {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).send({ error: 'Os campos obrigatórios não foram preenchidos.' });
        } else if (typeof nome !== 'string' || typeof email !== 'string' || typeof senha !== 'string') {
            return res.status(400).send({ error: 'Os campos não estão no formato correto.' });
        }
        next();
    }

    async validarPostId(req, res, next) {
        let { id } = req.params;
        id = Number(id);
        if (!id) {
            return res.status(400).send({ error: 'O id é obrigatório.' });
        }

        const post = await PostController.buscarPorid(id);
        if (!post) {
            return res.status(404).send({ error: 'Post não encontrado.' });
        }

        next();
    }

    async validarUserId(req, res, next) {
        let { id } = req.params;
        id = Number(id);
        if(!id) {
            return res.status(400).send({ error: 'O id é obrigatório.' });
        }
        const idValidation = await UserController.buscarPorId(id);
        if(!idValidation) {
            return res.status(404).send({ error: 'Id não encontrado.' });
        }
        next();
    }
}

module.exports = Middleware;