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

      if (typeof(title || description) === 'undefined') {
        return res.writeHead(400).end('Title and/or description are required')
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
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if(!(database.select('tasks', id, 'id') === id)){return res.writeHead(404).end('ID not found')}
      let { title, description } = req.body

      if (typeof(title || description) === 'undefined') {
        return res.writeHead(400).end('Title and/or description are required')
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

      if(!(database.select('tasks', id, 'id') === id)){return res.writeHead(404).end('ID not found')}

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      if(!(database.select('tasks', id, 'id') === id)){return res.writeHead(404).end('ID not found')}

      database.update('tasks', id, dateNow())

      return res.writeHead(204).end()
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/csv'),
    handler: (req, res) => {
      const tasks = req.body;

      for (const task of tasks) {
        const { title, description } = task;

        if (typeof(title || description) === 'undefined') {
          return res.writeHead(400).end(`Title and/or description are required\nObject: ${task}`)
        }

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
  }  
]