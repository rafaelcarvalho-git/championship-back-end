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

### POST /auth/register
- Cria um novo usuário
- Body da requisição deve conter:
    - name: string
    - email: string
    - password: string
- Respostas:
    - 201: usuario criado com sucesso
    - 400: usario já existe

### POST /auth/login
- Realiza o login
- Body da requisição deve conter:
    - email: string
    - password: string
- Respostas:
    - 201: autenticacao realizada com sucesso
    - 400: erro durante autenticacao   

### POST /teams/new
- Cria um novo time
- Requer um token de autenticação válido para acessar a rota
- Body da requisição deve conter:
    - name: string
    - shieldImage: string
    - city: string
    - coachName: string
    - website: string
- Respostas:
    - 201: time criado com sucesso
    - 400: dado necessário não presente, time já existente ou não é possível cadastrar mais times
    - 500: erro ocorreu durante a criação do time

### GET /teams/list/:id?
- Lista todos os times cadastrados, ou um time específico caso seja passado o ID como parâmetro
- Requer um token de autenticação válido para acessar a rota
- Respostas:
    - 200: lista de times ou time específico
    - 400: erro ao listar times existentes
    - 400: time não encontrado

### DELETE /teams/delete/:id
- Deleta um time específico pelo ID
- Requer um token de autenticação válido para acessar a rota
- Respostas:
    - 200: time removido com sucesso
    - 400: time não encontrado
    - 500: erro ao remover o time

### GET /teams/sort
- Sorteia os times cadastrados em 2 chaves, e gera as partidas correspondentes
- Requer um token de autenticação válido para acessar a rota
- Respostas:
    - 200: lista de partidas geradas
    - 400: não é possível sortear os times, é necessário ter 8 times cadastrados.
    - 500: erro ao sortear os times.

### PATCH /teams/edit/:id
- Edita um time específico pelo ID
- Requer um token de autenticação válido para acessar a rota
- Body da requisição deve conter:
    - name: string
    - shieldImage: string
    - city: string
    - coachName: string
    - website: string
- Respostas:
    - 200: time editado com sucesso
    - 400: time não encontrado
    - 500: erro ao editar o time
    
    
 

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
