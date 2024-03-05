
# Documentação da API

## Retorna todos os itens

### Request

- Método: `GET`
- Rota: `/tasks`

### Example Response

#### Resolve (Status Code 200)

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

#### Reject (Status Code 404)
```json
{
  "error": "Resource not found"
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
      "completed_at": null
    }
  ]
}
```

#### Reject (Status Code 404)

```json
{
  "error": "Resource not found"
}
```

## Envia o JSON pelo corpo da requisição

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

#### Reject (Status Code 404)

```json
{
  "error": "Resource not found"
}
```

### Envia o json pelo body da requisição
```http
  POST /tasks/csv
```

#### Parâmetros do Corpo

| Parâmetro     | Tipo     |  Descrição                          |
| ------------- | -------- | ----------------------------------- |
| `title`       | `string` | **Obrigatório**. Título da tarefa.                   |
| `description` | `string` | **Obrigatório**. Descrição detalhada da tarefa.      |

#### Exemplo de Solicitação
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
### Deleta uma task passando o ID dela

```http
  DELETE /tasks/id:${id}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID da task para a remoção|

### Envia o json pelo body da requisição
```http
  PUT /tasks/id:${id}
```

#### Parâmetros do Corpo

| Parâmetro     | Tipo     |  Descrição                          |
| ------------- | -------- | ----------------------------------- |
| `title1`       | `string` | **Opcional**. Título da tarefa.                   |
| `description1` | `string` | **Opcional**. Descrição detalhada da tarefa.      |
| `id` | `string` | **Obrigatório**. ID da task para a edição|

1- No caso, é necessário pelo menos o title e/ou description.

#### Exemplo de Solicitação
```http
POST /tasks HTTP/1.1
Host: exemplo.com
Content-Type: application/json

{
    "title": "Título da Tarefa"
}
```

### Envia a solicitação de task completa se tiver null ou null se tiver completa
```http
  PATCH /tasks/id:${id}/complete
```

#### Parâmetros do Corpo

| Parâmetro     | Tipo     |  Descrição                          |
| ------------- | -------- | ----------------------------------- |   |
| `id` | `string` | **Obrigatório**. ID da task para a edição|