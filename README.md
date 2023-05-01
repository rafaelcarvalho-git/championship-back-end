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
