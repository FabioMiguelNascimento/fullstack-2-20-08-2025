# Documentação da API

# Stack
- `zod`: Validação de entrada de dados.
- `typescript`: Tipagem estática para o código em desenvolvimento.
- `express`: Criação do servidor e gerenciamento de rotas.
- `bcrypt`: Encriptação de senhas.
- `jsonwebtoken`: Criação e validação de tokens JWT para autenticação.

## 1. Arquitetura

O projeto utiliza uma arquitetura baseada em **Clean Architecture**.

As principais camadas são:

-   **Domain/Entities (Entidades):** Representada pelas `interfaces` e `schemas`, define as estruturas de dados e regras de negócio centrais da aplicação.
-   **Application (Casos de Uso):** A pasta `use-cases` contém a lógica de negócio da aplicação, orquestrando as ações a serem executadas sem depender de detalhes de implementação (como banco de dados ou frameworks web).
-   **Infrastructure (Infraestrutura):** A camada mais externa, `infrastructure`, contém os detalhes de implementação. Isso inclui o servidor web, controllers, rotas, e a implementação dos repositórios que interagem com o banco de dados.

## 2. Estrutura de Pastas

Abaixo está a descrição das principais pastas dentro de `src/`:

-   `src/`
    -   `database/`: Contém a configuração e a instância do banco de dados (neste caso, um arquivo JSON).
    -   `infrastructure/`: Implementações de tecnologias e frameworks.
        -   `database/`: Implementação dos repositórios (ex: `product.repository.ts`) que efetivamente buscam e salvam dados no banco.
        -   `https/`: Tudo relacionado ao protocolo HTTP.
            -   `controller/`: Converte as requisições HTTP em chamadas para os `use-cases` e formata as respostas.
            -   `routes/`: Define os endpoints da API, seus métodos (GET, POST, etc.) e os middlewares associados.
    -   `interfaces/`: Define os contratos (interfaces) para as entidades do sistema, como `User` e `Product`.
    -   `middlewares/`: Funções que interceptam as requisições antes de chegarem aos controllers, usadas para validação, autenticação e autorização.
    -   `schema/`: Define os schemas de validação de dados (usando Zod) para as requisições e respostas.
    -   `use-cases/`: Contém a lógica de negócio principal da aplicação, separada por entidade (auth, product, user).
    -   `utils/`: Funções utilitárias reutilizáveis, como `bcrypt` para senhas e `generateToken` para JWT.

## 3. Fluxo de uma Requisição

Uma requisição HTTP típica segue o seguinte fluxo:

1.  **Server (`server.ts`):** O servidor Express recebe a requisição e a encaminha para a rota apropriada.
2.  **Rota (`routes/`):** A requisição chega a um endpoint definido em um arquivo de rota (ex: `product.route.ts`).
3.  **Middleware (`middlewares/`):** A rota aciona um ou mais middlewares para:
    -   Validar o corpo da requisição (`validateRequestMiddleware`).
    -   Verificar se o usuário está autenticado (`authMiddleware`).
    -   Verificar se o usuário tem a permissão necessária (`permissionMiddleware`).
4.  **Controller (`controller/`):** Se a requisição passar pelos middlewares, ela chega ao controller correspondente (ex: `product.controller.ts`). O controller extrai os dados da requisição (body, params, query).
5.  **Caso de Uso (`use-cases/`):** O controller chama o caso de uso apropriado (ex: `create.ts` em `use-cases/product/`), passando os dados necessários. É aqui que a regra de negócio é executada.
6.  **Repositório (`infrastructure/database/`):** O caso de uso utiliza um repositório (ex: `product.repository.ts`) para interagir com o banco de dados, abstraindo a lógica de acesso aos dados.
7.  **Resposta:** O fluxo retorna, com o caso de uso devolvendo os dados ao controller, que por sua vez envia a resposta HTTP ao cliente.

---

## 4. Documentação da API (Endpoints)

A URL base para todas as rotas é `/api`.

### Auth

Endpoints para registro e login de usuários.

-   **`POST /auth/register`**
    -   **Descrição:** Registra um novo usuário.
    -   **Autenticação:** Pública.
    -   **Corpo da Requisição:**
        ```json
        {
          "name": "string (min 3 caracteres)",
          "email": "string (email válido)",
          "password": "string (min 6 caracteres)"
        }
        ```

-   **`POST /auth/login`**
    -   **Descrição:** Autentica um usuário e retorna um token JWT.
    -   **Autenticação:** Pública.
    -   **Corpo da Requisição:**
        ```json
        {
          "email": "string (email válido)",
          "password": "string (min 6 caracteres)"
        }
        ```

### Ping

Endpoint para verificar a disponibilidade da API.

-   **`GET /ping`**
    -   **Descrição:** Retorna um "pong" para indicar que a API está online.
    -   **Autenticação:** Pública.
    -   **Resposta:**
        ```json
        {
          "message": "pong"
        }
        ```

### Products

Endpoints para gerenciar produtos.

-   **`GET /products`**
    -   **Descrição:** Lista todos os produtos. Pode receber query params para filtro.
    -   **Autenticação:** Pública.
    -   **Query Params (Opcionais):** `name`, `description`, `price`, `quantity`.

-   **`GET /products/:id`**
    -   **Descrição:** Busca um produto pelo seu ID.
    -   **Autenticação:** Pública.
    -   **Parâmetros da Rota:** `id` (número inteiro positivo).

-   **`POST /products`**
    -   **Descrição:** Cria um novo produto.
    -   **Autenticação:** Requer autenticação e permissão de `ADMIN` ou `MANAGER`.
    -   **Corpo da Requisição:**
        ```json
        {
          "name": "string",
          "description": "string (opcional)",
          "price": "number (positivo)",
          "quantity": "number (opcional, default 0)"
        }
        ```

-   **`PATCH /products/:id`**
    -   **Descrição:** Atualiza parcialmente um produto existente.
    -   **Autenticação:** Requer autenticação e permissão de `ADMIN` ou `MANAGER`.
    -   **Parâmetros da Rota:** `id` (número inteiro positivo).
    -   **Corpo da Requisição (parcial):**
        ```json
        {
          "name": "string (opcional)",
          "description": "string (opcional)",
          "price": "number (positivo, opcional)",
          "quantity": "number (opcional)"
        }
        ```

-   **`DELETE /products/:id`**
    -   **Descrição:** Deleta um produto.
    -   **Autenticação:** Requer autenticação e permissão de `ADMIN` ou `MANAGER`.
    -   **Parâmetros da Rota:** `id` (número inteiro positivo).

### Users

Endpoints para gerenciar usuários.

-   **`GET /users`**
    -   **Descrição:** Lista todos os usuários.
    -   **Autenticação:** Requer autenticação.

-   **`PATCH /users/:id`**
    -   **Descrição:** Atualiza parcialmente um usuário.
    -   **Autenticação:** Requer autenticação. O usuário só pode alterar os próprios dados, a menos que tenha permissão.
    -   **Parâmetros da Rota:** `id` (número inteiro positivo).
    -   **Corpo da Requisição (parcial):**
        ```json
        {
          "name": "string (opcional)",
          "email": "string (email válido, opcional)",
          "password": "string (min 6 caracteres, opcional)"
        }
        ```

-   **`DELETE /users/:id`**
    -   **Descrição:** Deleta um usuário.
    -   **Autenticação:** Requer autenticação e permissão de `ADMIN` ou `MANAGER`.
    -   **Parâmetros da Rota:** `id` (número inteiro positivo).
