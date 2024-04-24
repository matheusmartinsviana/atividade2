# Adaptação API REST com Node e Express

Converter a estrutura de entidades e funcionalidades da atividade anterior para um banco de dados relacional e aplicando a estrutura MVC.

## Estrutura de Pastas:

src 
   |__ api <br>
   |__ config <br>
   |__ controllers <br>
   |__ models <br>
   |__ index.js <br>
   |__ package.json

* api - Representa a _View_ do MVC, onde as rotas da API REST serão definidas.
* config - Contém o arquivo de configuração do banco de dados.
* controllers - Representa o _Controller_ do MVC, onde a lógica de negócio será implementada.
* models - Representa o _Model_ do MVC, onde as entidades do banco de dados serão definidas.
* index.js - Arquivo principal da aplicação, onde o servidor será inicializado.
  
## Passos sugeridos:

1. Converter a estrutura de Usuário para MVC.
2. Converter a estrutura de Postagens para MVC.
3. Testar as rotas usando ferramentas como Postman ou curl.
4. Integrar as entidades no banco de dados.
5. Testar as rotas usando ferramentas como Postman ou curl e verificar o banco de dados.
6. Aplicar um middleware de validação as rotas de Postagens e as rotas de alteração, listagem e deleção de Usuários.
7. Testar as rotas usando ferramentas como Postman ou curl.

## Como usar

1. Crie um usúario na rota ```http://localhost:3000/users``` com os paramÊtros no body ```{ nome, email e senha }```.
2. Realize o login na rota ```http://localhost:3000/login``` com os paramêtros no body ```{ email, senha }``` e a api irá lhe retornar o seu token.
3. Copie o token retornado no passo anterior e coloque no header da sua aplicação ```key: Authorization``` e ```value: SeuTokenCopiado```