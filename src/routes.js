import Database from './database.js'
import { randomUUID } from 'node:crypto'
import dateNow from './utils/build-date-now.js'
import buildRoutePath from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query 

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (typeof(title) === 'string' && typeof(description) === 'string') {
        return res.writeHead(400).end('{"error": "Title and description are required & must be string"}')
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: dateNow(),
        update_at: dateNow(),
        completed_at: null
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/csv'),
    handler: (req, res) => {
      const tasks = req.body;

      if (tasks === null) {
        return res.writeHead(400).end('{"error": "text/plain formatted error"}')
      }

      for (const task of tasks) {
        const { title, description } = task;

        const newTask = {
          id: randomUUID(),
          title,
          description,
          created_at: dateNow(),
          update_at: dateNow(),
          completed_at: null
        };
  
        database.insert('tasks', newTask);
      }
  
      return res.writeHead(201).end();
    }
  },  
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if(!(database.select('tasks', id, 'id') === id)){return res.writeHead(404).end('ID not found')}
      let { title, description } = req.body

      if (typeof(title || description) === 'undefined') {
        return res.writeHead(400).end('{"error": "Title and/or description are required"}')
      }

      if (typeof(title) === 'string' || typeof(description) === 'string') {
        return res.writeHead(400).end('{"error": "Title and/or description must be string"}')
      }

      title = title ?? database.select('tasks', id, 'title')

      description = description ?? database.select('tasks', id, 'description')

      database.update('tasks', id, {
        title, 
        description,
        created_at: database.select('tasks', id, 'created_at'),
        update_at: dateNow(),
        completed_at: database.select('tasks', id, 'completed_at')
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if(!(database.select('tasks', id, 'id') === id)){return res.writeHead(404).end('{"error": "ID not found"}')}

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      if(!(database.select('tasks', id, 'id') === id)){return res.writeHead(404).end('{"error": "ID not found"}')}

      database.update('tasks', id, dateNow())

      return res.writeHead(204).end()
    }
  }
]