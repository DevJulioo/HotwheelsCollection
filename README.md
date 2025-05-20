# CollectionHotwheels API - Backend

A **CollectionHotwheels API** é uma aplicação backend construída com **Node.js**, **Express** e **MongoDB**, que fornece uma interface para gerenciamento de carros. Com ela, é possível realizar operações CRUD completas (Create, Read, Update, Delete).

## 🧰 Tecnologias Utilizadas

* **Node.js** – Plataforma JavaScript para o backend
* **Express** – Framework web leve e flexível
* **MongoDB** – Banco de dados NoSQL
* **Mongoose** – ODM para modelar os dados do MongoDB
* **dotenv** – Para gerenciar variáveis de ambiente
* **CORS** – Para permitir requisições cross-origin
* **body-parser** – Para interpretar o corpo das requisições HTTP
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

## 📄 Endpoints

### **\[POST] /api/cars**

Cria um novo carro.

**Exemplo de corpo (JSON):**

```json
{
  "nome": "Twin Mill",
  "modelo": "Modelo D",
  "ano": 2010,
  "imagem": "http://example.com/images/bmw-x6.jpg"
}
```

---

### **\[POST] /api/cars/multiple**

Cria múltiplos carros de uma vez.

**Corpo (JSON):**

```json
[
  {
    "nome": "Civic",
    "modelo": "Model C",
    "ano": 2018,
    "imagem": "http://example.com/images/civic.jpg"
  },
  {
    "nome": "Corolla",
    "modelo": "Modelo E",
    "ano": 2019,
    "imagem": "http://example.com/images/corolla.jpg"
  }
]
```

---

### **\[GET] /api/cars**

Retorna a lista de todos os carros cadastrados.

---

### **\[GET] /api/cars/\:id**

Retorna um carro específico com base no ID.

---

### **\[PUT] /api/cars/\:id**

Atualiza os dados de um carro.

**Corpo esperado (JSON):**

```json
{
  "nome": "BMW X6",
  "modelo": "2021",
  "ano": 2021,
  "imagem": "http://example.com/images/bmw-x6-2021.jpg"
}
```

---

### **\[DELETE] /api/cars/\:id**

Remove um carro pelo ID.

---

### **\[DELETE] /api/cars/delete-all**

Remove **todos** os carros do banco de dados.

---

### **\[GET] /api/cars/welcome**

Retorna uma mensagem simples de boas-vindas:

```json
{
  "message": "Bem-vindo à API de Carros!"
}
```

---

## 📘 Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3000/api-docs
```

---

## ▶️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DevJulioo/HotwheelsCollection
cd HotwheelsCollection
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

> Substitua `<usuario>`, `<senha>`, `<cluster>` e `<dbname>` pelos valores reais do seu banco MongoDB.

---

### 4. Inicie o servidor

```bash
npm start
```

A API estará disponível em:
📍 `http://localhost:3000`

---

### 5. Teste com CURL ou Postman

Exemplo de requisição **POST** via `curl`:

```bash
curl -X POST http://localhost:3000/api/cars \
-H "Content-Type: application/json" \
-d '{
  "nome": "BMW X6",
  "modelo": "Model A",
  "ano": 2010,
  "imagem": "http://example.com/images/bmw-x6.jpg"
}'
```
## 📦 Sugestão de consumo da API com `carService.js`

Para facilitar o consumo da WebCars API em seus projetos frontend (React, React Native, Vue, etc.), você pode criar um módulo JavaScript dedicado a fazer as requisições HTTP, isolando a lógica da API.

### Exemplo de `carService.js`
```bash
const API_BASE = 'https://web-cars-7wxh.onrender.com/api/cars';

export async function getCars() {
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();
    if (data.success) return data.data;
    throw new Error(data.message || 'Erro ao buscar carros');
  } catch (error) {
    throw error;
  }
}

export async function getCarById(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    if (data.success) return data.data;
    throw new Error(data.message || 'Carro não encontrado');
  } catch (error) {
    throw error;
  }
}

export async function createCar(carData) {
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData),
    });
    const data = await res.json();
    if (data.success) return data.data;
    throw new Error(data.message || 'Erro ao criar carro');
  } catch (error) {
    throw error;
  }
}

export async function updateCar(id, carData) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData),
    });
    const data = await res.json();
    if (data.success) return data.data;
    throw new Error(data.message || 'Erro ao atualizar carro');
  } catch (error) {
    throw error;
  }
}

export async function deleteCar(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) return true;
    throw new Error(data.message || 'Erro ao deletar carro');
  } catch (error) {
    throw error;
  }
}
```
