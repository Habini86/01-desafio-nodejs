import parseCsv from './parseCsv.js'

export default async function json(req, res) {
  const buffers = []

  for await(const chunk of req) {
    buffers.push(chunk)
  }

  const data = Buffer.concat(buffers).toString()
  
  try {
    if (req.headers['content-type'] === 'text/plain') {
      req.body = await parseCsv(data)
    } else {
      req.body = JSON.parse(data)
    }
  } catch (err) {
    req.body = null
  }

  res.setHeader('Content-Type', 'application/json')
}