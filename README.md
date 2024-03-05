# 01-desafio-nodejs

Foi desenvolvido uma API para realizar o CRUD de tasks (tarefas).

 - [Fonte do desafio](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f)

# Documentação da API

## Jsons utilizados como exemplos

### Json no banco de dados
```json
{
  "items": [
    {
      "id": "71f40a9a-6dee-4908-af1b-77242180b259",
      "title": "Reunião de Planejamento",
      "description": "Participar da reunião de planejamento semanal com a equipe para discutir as metas e tarefas da próxima semana",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": null
    },
    {
      "id": "bbd7dfea-3d9c-480e-b167-9a9e86b64f35",
      "title": "Desenvolvimento de Recursos",
      "description": "Trabalhar no desenvolvimento do novo recurso de autenticação para o aplicativo móvel",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": "complete"
    }
  ]
}
```

### Json para o Post
```json
{
  "title": "Título da Tarefa",
  "description": "Descrição detalhada da tarefa"
}
```

## CSV usado como exemplo

### CSV usado como exemplo
| **Título** | **Descrição** |
|------------|---------------|
| Task 01    | Descrição da Task 01 |
| Task 02    | Descrição da Task 02 |
| Task 03    | Descrição da Task 03 |
| Task 04    | Descrição da Task 04 |
| Task 05    | Descrição da Task 05 |

### Passar o CSV no Post
```text
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
```

## Status code de erro geral

#### Reject (Status Code 404)
```http
GET /task HTTP/1.1
Host: exemplo.com
Content-Type: application/json
{
  "error": "Resource not found"
}
```

## Retorna todos os itens

### Request

- Método: `GET`
- Rota: `/tasks`

### Example Response

#### Resolve (Status Code 200)

```http
GET /tasks HTTP/1.1
Host: exemplo.com
Content-Type: application/json
{
  "items": [
    {
      "id": "71f40a9a-6dee-4908-af1b-77242180b259",
      "title": "Reunião de Planejamento",
      "description": "Participar da reunião de planejamento semanal com a equipe para discutir as metas e tarefas da próxima semana",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": null
    },
    {
      "id": "bbd7dfea-3d9c-480e-b167-9a9e86b64f35",
      "title": "Desenvolvimento de Recursos",
      "description": "Trabalhar no desenvolvimento do novo recurso de autenticação para o aplicativo móvel",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": "complete"
    }
  ]
}
```

## Retorna os valores correspondentes

### Request

- Método: `GET`
- Rota: `/tasks?search=${value}`

#### Parameters

- `value` (opcional): Filtra o título e a descrição pelo valor especificado.

### Example Response

#### Resolve (Status Code 200)

```http
GET /tasks?search HTTP/1.1
Host: exemplo.com
Content-Type: application/json
{
  "items": [
    {
      "id": "71f40a9a-6dee-4908-af1b-77242180b259",
      "title": "Reunião de Planejamento",
      "description": "Participar da reunião de planejamento semanal com a equipe para discutir as metas e tarefas da próxima semana",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": null
    },
    {
      "id": "bbd7dfea-3d9c-480e-b167-9a9e86b64f35",
      "title": "Desenvolvimento de Recursos",
      "description": "Trabalhar no desenvolvimento do novo recurso de autenticação para o aplicativo móvel",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": null
    }
  ]
}
```

#### Resolve (Status Code 200)

```http
GET /tasks?search=aplicati HTTP/1.1
Host: exemplo.com
Content-Type: application/json
{
  "items": [
    {
      "id": "bbd7dfea-3d9c-480e-b167-9a9e86b64f35",
      "title": "Desenvolvimento de Recursos",
      "description": "Trabalhar no desenvolvimento do novo recurso de autenticação para o aplicativo móvel",
      "created_at": "28/02/2024 17h27",
      "update_at": "28/02/2024 17h27",
      "completed_at": null
    }
  ]
}
```

## Envia o JSON para inserção de dados pelo corpo da requisição

### Request

- Método: `POST`
- Rota: `/tasks`

#### Body parameters

| Parameter     | Type     |  Description                          |
| ------------- | -------- | ----------------------------------- |
| `title`       | `string` | **Obrigatório**. Título da tarefa.                   |
| `description` | `string` | **Obrigatório**. Descrição detalhada da tarefa.      |

### Example Body

```http
POST /tasks HTTP/1.1
Host: exemplo.com
Content-Type: application/json

{
  "title": "Título da Tarefa",
  "description": "Descrição detalhada da tarefa"
}
```

### Example Response

#### Resolve (Status Code 201)
```json

```

#### Reject (Status Code 400)

```json
{
  "error": "Title and description are required & must be string"
}
```

## Envia o CSV para inserção de dados pelo corpo da requisição

### Request

- Método: `POST`
- Rota: `/tasks/csv`

#### Body parameters

| Parameter     | Type     |  Description                          |
| ------------- | -------- | ----------------------------------- |
| `title`       | `string` | **Obrigatório**. Título da tarefa.                   |
| `description` | `string` | **Obrigatório**. Descrição detalhada da tarefa.      |

### Example Body

```http
POST /tasks/csv HTTP/1.1
Host: exemplo.com
Content-Type: text/plain

title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
```

### Example Response

#### Resolve (Status Code 201)
```json

```

#### Reject (Status Code 400)

```json
{
  "error": "text/plain formatted error"
}
```

## Deleta uma task passando o ID dela

### Request

- Método: `DELETE`
- Rota: `/tasks/id:${id}`

#### Parameters

- `id` (obrigatório): ID da task para a remoção.

### Example Response

#### Resolve (Status Code 204)
```json

```

#### Reject (Status Code 404)

```json
{
  "error": "ID not found"
}
```

## Envia o JSON para alterar os valores pelo body da requisição

### Request

- Método: `PUT`
- Rota: `/tasks/id:${id}`

#### Parameters

- `id` (obrigatório): ID da task para a edição.

#### Body parameters

| Parameter     | Type     |  Description                          |
| ------------- | -------- | ----------------------------------- |
| `title`       | `string` | **Obrigatório**. Título da tarefa.                   |
| `description` | `string` | **Obrigatório**. Descrição detalhada da tarefa.      |

1- No caso, é necessário pelo menos o title e/ou description.

### Example Body

```http
POST /tasks/id:71f40a9a-6dee-4908-af1b-77242180b259 HTTP/1.1
Host: exemplo.com
Content-Type: application/json

{
  "title": "Título da Tarefa"
}
```

```http
POST /tasks/id:71f40a9a-6dee-4908-af1b-77242180b259 HTTP/1.1
Host: exemplo.com
Content-Type: application/json

{
  "description": "Descrição da tarefa"
}
```

```http
POST /tasks/id:71f40a9a-6dee-4908-af1b-77242180b259 HTTP/1.1
Host: exemplo.com
Content-Type: application/json

{
  "title": "Título da Tarefa",
  "description": "Descrição da tarefa"
}
```

### Example Response

#### Resolve (Status Code 204)
```json

```

#### Reject (Status Code 404)

```json
{
  "error": "ID not found"
}
```

#### Reject (Status Code 400)

```json
{
  "error": "Title and/or description are required"
}
```

#### Reject (Status Code 400)

```json
{
  "error": "Title and/or description must be string"
}
```

## Envia a solicitação de task completa se tiver null ou null se tiver completa

### Request

- Método: `PATCH`
- Rota: `/tasks/id:${id}/complete`

#### Parameters

- `id` (obrigatório): ID da task para a edição.

### Example Response

#### Resolve (Status Code 204)
```json

```

#### Reject (Status Code 404)

```json
{
  "error": "ID not found"
}
```