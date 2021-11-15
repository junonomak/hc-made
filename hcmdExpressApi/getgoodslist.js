const fs = require('fs')
const { promisify } = require ('util')
const path = require('path')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dbPath = path.join(__dirname, '../hcmadeapi/data.json')

exports.getDb = async () => {
  const data = await readFile(dbPath, 'UTF8')
  return JSON.parse(data)
}

exports.savedb = async db => {
  const data = JSON.stringify(db , null , '  ')
  await writeFile(dbPath, data)
}