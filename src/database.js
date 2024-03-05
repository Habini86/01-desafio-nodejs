import * as fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export default class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, searchOrId, search) {
    let data = this.#database[table] ?? []

    if(typeof searchOrId === 'object') { 
      if(searchOrId) {
        data = data.filter(row => {
          return Object.entries(searchOrId).some(([key, value]) => {
            return row[key].toLowerCase().includes(value.toLowerCase())
          })
        })  
      }
    } else if(typeof searchOrId === 'string') { 
      const task = data.find(row => row.id === searchOrId)
      if(task) {
        data = task[search]
      }
    }
  
    return data
  }
  

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(typeof data === 'object') {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()

    } else if(typeof data === 'string') {
      let task = this.#database[table][rowIndex]

      task['completed_at'] = task['completed_at'] === null ? 'complete' : null

      task['update_at'] = data

      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id ===id)

    this.#database[table].splice(rowIndex, 1)
    this.#persist()
  }
}