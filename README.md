# 🚀 CollectionHotwheels API - Backend

A **CollectionHotwheels API** é uma aplicação backend construída com **Java** e **MySQL**, que fornece uma interface para gerenciamento de carros.  
Com ela, é possível realizar operações CRUD completas: **Create**, **Read**, **Update** e **Delete**.

---

## 🧰 Tecnologias Utilizadas

- **Java** – Plataforma para o backend  
- **CORS** – Permite requisições cross-origin  
- **Swagger** – Documentação interativa da API  

---

## 🚗 Funcionalidades

A API permite:

- Criar um ou vários carros  
- Listar todos os carros  
- Buscar um carro por ID  
- Atualizar dados de um carro  
- Deletar um carro por ID  
- Deletar todos os carros  
- Ver uma mensagem de boas-vindas  
- Acessar a documentação interativa via Swagger  

---

## 📄 Endpoints

### 🔹 Criar um novo carro  
**[POST]** `https://localhost:8080/hotwheels`  
**Corpo da requisição:**
```json
{
  "nome": "Twin Mill",
  "modelo": "Modelo D",
  "ano": 2010,
  "imagem": "http://example.com/images/twinmill.jpg"
}
```

---

### 🔹 Listar todos os carros  
**[GET]** `https://localhost:8080/hotwheels`

---

### 🔹 Buscar um carro por ID  
**[GET]** `https://localhost:8080/hotwheels/{id}`

---

### 🔹 Atualizar os dados de um carro  
**[PUT]** `https://localhost:8080/hotwheels/{id}`  
**Corpo da requisição:**
```json
{
  "nome": "BMW X6",
  "modelo": "2021",
  "ano": 2021,
  "imagem": "http://example.com/images/bmw-x6-2021.jpg"
}
```

---

### 🔹 Deletar um carro por ID  
**[DELETE]** `https://localhost:8080/hotwheels/{id}`

---
