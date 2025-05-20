# CollectionHotwheels API - Backend

A **CollectionHotwheels API** é uma aplicação backend construída com **Java** e **MySqel**, que fornece uma interface para gerenciamento de carros. Com ela, é possível realizar operações CRUD completas (Create, Read, Update, Delete).

## 🧰 Tecnologias Utilizadas

* **Java** – Plataforma para o backend
* **CORS** – Para permitir requisições cross-origin
* **Swagger** – Para documentação interativa da API

---

## 🚗 Funcionalidades

A API permite:

* Criar um ou vários carros
* Listar todos os carros
* Buscar um carro por ID
* Atualizar dados de um carro
* Deletar um carro por ID
* Deletar todos os carros
* Ver mensagem de boas-vindas
* Documentação interativa via Swagger

---

Endpoints
[POST] https://localhost:8080/hotwheels/
Cria um novo hotwheels.
{
  "nome": "Twin Mill",
  "modelo": "Modelo D",
  "ano": 2010,
  "imagem": "http://example.com/images/twinmill.jpg"
}

[GET] https://localhost:8080/hotwheels/
Retorna a lista de todos os hotwheels cadastrados.

[GET] https://localhost:8080/hotwheels/{id}
Retorna um hotwheels específico com base no ID.

[PUT] https://localhost:8080/hotwheels/{id}
Atualiza os dados de um hotwheels.
{
  "nome": "BMW X6",
  "modelo": "2021",
  "ano": 2021,
  "imagem": "http://example.com/images/bmw-x6-2021.jpg"
}
[DELETE] https://localhost:8080/hotwheels/{id}
Remove um hotwheels específico pelo ID.


