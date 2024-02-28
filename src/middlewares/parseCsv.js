import { parse } from 'csv-parse'
import { Readable } from 'stream'

export default function parseCsv(data) {
  return new Promise((resolve, reject) => {
    const records = []
    const parser = parse({
      columns: true,
      skip_empty_lines: true
    })

    parser.on('readable', () => {
      let chunck
      while (chunck = parser.read()) {
        records.push(chunck)
      }
    })

    parser.on('end', () => resolve(records))
    parser.on('error', (err) => reject(err))

    Readable.from(data).pipe(parser)
  })
}