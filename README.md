# GoFinance-api

## Pré Requisitos:

- NodeJs
- Postgres
- Yarn ou NPM

## Instalação

1.  Faça um clone desse repositório rodando no seu terminal:

        https://github.com/rafaelone/GoFinance-api.git;

2.  Entre na pasta utilizando o comando:

        cd GoFinance-api

3.  Execute o comando:

        yarn ou npm

4.  Execute o comando:

    yarn dev:server ou npm run dev:server

## Rotas da aplicação

- URL: http://localhost:3333

**Login**

- **Método**: `POST`
- **Request**: `/sessions/`
- **Body**: `{email: "seu email", password: "sua senha"}`

---

**Cadastre-se**

- **Método**: `POST`
- **Request**: `/users/`
- **Body**: `{name: "seu nome", email: "seu email", password: "sua senha"}`

---

**PS**: É necessário estar logado para continuar

## **Transações**

**_Nova transação_**

        Método: POST
        Request: /transactions/
        Body: {title: "Título da transação", value: "Valor", type: "income Ou outcome", category: "Categoria"}

---

**_Listar transações_**

        Método: Get
        Request: /transactions/

---

**_Apagar transação_**

        Método: Delete
        Request: /transactions/:id

---
