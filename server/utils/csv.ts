import fs from 'node:fs'
import { parse } from 'csv-parse'

export function csvToObjectArray<T>(filePath: string, cb: (d: any) => T): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = []
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, delimiter: ',', bom: true }))
      .on('data', (data: any) => {
        results.push(cb(data))
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
