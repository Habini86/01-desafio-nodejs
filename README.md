# 01-desafio-nodejs

Foi desenvolvido uma API para realizar o CRUD de tasks (tarefas).
## Documentação da API

### Retorna todos os itens

```http
  GET /tasks
```

### Retorna os valores correspondetes

```http
  GET /tasks?search=${value}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `value` | `string` | **Opcional**. Filtra o title e o description pelo value |

### Envia o json pelo body da requisição
```http
  POST /tasks
```

#### Parâmetros do Corpo

| Parâmetro     | Tipo     |  Descrição                          |
| ------------- | -------- | ----------------------------------- |
| `title`       | `string` | **Obrigatório**. Título da tarefa.                   |
| `description` | `string` | **Obrigatório**. Descrição detalhada da tarefa.      |

#### Exemplo de Solicitação
```http
POST /tasks HTTP/1.1
Host: exemplo.com
Content-Type: application/json

{
    "title": "Título da Tarefa",
    "description": "Descrição detalhada da tarefa"
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
| ------------- | -------- | ----------------------------------- |
| `id` | `string` | **Obrigatório**. ID da task para a edição|
