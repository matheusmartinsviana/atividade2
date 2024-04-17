const PostController = require('../controllers/post');

class PostApi {

    async listarPost(req, res) {
        try {
            const posts = await PostController.listarPosts();
            res.send(posts);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async criarPost(req, res) {
        try {
            const { titulo, conteudo, userId } = req.body;
            const post = await PostController.criarPost(titulo, conteudo, userId);
            res.send(post);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async alterarPost(req, res) {
        try {
            const { id } = req.params;
            const { titulo, conteudo, userId } = req.body;
            const post = await PostController.alterarPost(id, titulo, conteudo, userId);
            res.send(post);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async deletarPost(req, res) {
        try {
            const { id } = req.params;
            await PostController.deletarPost(id);
            res.send();
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

module.exports = PostApi;