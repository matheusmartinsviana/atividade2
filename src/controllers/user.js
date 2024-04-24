const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const saltRounds = 10;

class UserController {
    async criarUsuario(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        // INSERT INTO users (nome, email, senha) VALUES (nome, email, senhaCriptografada);
        const user = await User.create({ nome, email, senha: senhaCriptografada });

        return user;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async alterarUsuario(id, nome, email, senha) {
        if (!id || !nome || !email || !senha) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(id);

        user.nome = nome;
        user.email = email;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        user.senha = senhaCriptografada;
        // UPDATE users SET nome = nome, email = email, senha = senha WHERE id = id;
        user.save();

        return user;
    }

    async deletarUsuario(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(id);

        user.destroy();
    }

    async listarUsuarios() {
        return User.findAll();
    }

    async login(email, senha) {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios')
        }

        // SELECT * FROM users WHERE email = email;
        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Compara a senha informada com a senha do usuário
        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            throw new Error('Senha inválida');
        }

        // Gera o token a partir da assinatura com a chave secreta
        const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

        return { token: jwtToken }
    }

    async validarToken(token) {
        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (error) {
            throw new Error('Token inválido')
        }
    }

}

module.exports = new UserController;