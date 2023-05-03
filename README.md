# Championship-back-end

- Projeto da disciplina de Web 2 para composição da nota da N2.
- Autores:
  - [Rafael Carvalho](https://github.com/rafaelcarvalho-git)
  - [Michele Leite](https://github.com/miihleite)
  - [Samuel Vitor](https://github.com/thesamuelvitor)

# Como rodar o projeto

```bash
# deve conter o node e o npm instalados;

# clonar o repositorio:
git clone https://github.com/rafaelcarvalho-git/championship-back-end.git

# instalar os pacotes node
npm install

# rodar o projeto
npm start
```

## Rotas Possíveis

### /auth/register

- Cadastro de usuario
- A requisicao deve conter os seguintes campos;
- A falta de qualquer um desses campos resultará em um erro;

```json
// request
{
  "name": "Teste",
  "email": "teste@gmail.com",
  "password": "1234"
}

// response
{
  "message": "usuario cadastrado com sucesso"
}
```

### /auth/login

- Rota de login
- A requisicao deve conter os seguintes campos;
- A falta de qualquer um desses campos resultará em um erro;
- O token da requisicao será dado caso retorne um sucesso;
- O token dado deve ser colocado como header para as rotas protegidas;

```json
// request
{
  "email": "teste@gmail.com",
  "password": "1234"
}

// response
{
  "sucess": "true",
  "token": "dasjdsadlsaçdjsadkasçass74wq542"
}
```

## Questoes
Crie uma API(apenas backend) de organização de um pequeno campeonato de futebol. Use Node e Express como tecnologias. Atenda aos seguintes requisitos:
- A) Um usuário administrador já cadastrado poderá fazer login para usar a API, recebendo um token para as demais requisições
- B) Após logado, o administrador poderá cadastrar 8 times, cada um com nome, imagem do escudo, cidade, nome do técnico, site
- C) O usuário poderá cadastrar 22 jogadores para cada time, com nome, foto, altura, peso, idade, posição e número
- D) O usuário poderá consultar, excluir, editar e deletar times e jogadores
- E) O usuário poderá pedir ao sistema para gerar um sorteio de jogos para a primeira rodada do campeonato. Essa função verifica se todos os times e jogadores estão cadastrados. 
- F) Todas essas informações devem estar em banco de dados MongoDB na nuvem
- G) O usuário poderá listar os 4 jogos sorteados com timeA e timeB cada
- H) O usuário poderá listar jogadores por time
- J) O sistema deve estar rodando em nuvem (pode ser Vercel)
