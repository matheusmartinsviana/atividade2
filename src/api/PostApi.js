const PostController = require('../controllers/post');

class PostApi {

    async listarPosts(req, res) {
        try {
            const posts = await PostController.listarPosts();
            res.send(posts);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async mostrarPost(req, res) {
        try {
            const { id } = req.params;
            const post = await PostController.buscarPorid(id);
            res.send(post);
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
            res.status(204);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async mostrarUserPosts(req, res) {
        try {
            const { id } = req.params;
            await PostController.mostrarUserPosts(id);
            res.status(200)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

}

module.exports = PostApi;