const Post = require('../models/post');

class PostController {

    async criarPost(titulo, conteudo, userId) {

        if (
            titulo === undefined
            || conteudo === undefined
            || userId === undefined
        ) {
            throw new Error('Título, conteúdo e id do usuário são obrigatórios');
        }
        
        const post = await Post.create({ titulo, conteudo, userId });

        return post;
    }

    async buscarPorid(id) {
        if(id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const post = await Post.findByPk(id);

        if(!post) {
            throw new Error('Post não encontrado');
        }

        return post;
    }

    async alterarPost(id, titulo, conteudo, userId) {
        if (!id || !titulo || !conteudo || !userId) {
            throw new Error('Id, título, conteúdo e id do usuário são obrigatórios');
        }

        const post = await this.buscarPorid(id);

        post.titulo = titulo;
        post.conteudo = conteudo;
        post.userId = userId;
        post.save();

        return post;
    }

    async deletarPost(id) {
        if(id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const post = await this.buscarPorid(id);

        post.destroy();

        return post;
    }

    async listarPosts() {
        const posts = await Post.findAll();

        return posts;
    }
}

module.exports = new PostController;