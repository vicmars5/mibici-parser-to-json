const csv = require('fast-csv')
const fs = require('fs')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)

const read = (ifile) => new Promise((resolve, reject) => {

  const lines = []
  csv
    .fromPath(ifile)
    .on('data', (data) => {

      lines.push(data)
    })
    .on('end', () => {

      resolve(lines)
    })
});

const parseJson = async (ifile, ofile) => {

  const lines = await read(ifile)
  const keys = lines.splice(0, 1)[0]
  const stations = lines.map(line => {
    const station = {}
    keys.forEach((k, i) => station[k] = line[i])
    return station
  })
  await writeFile(ofile, JSON.stringify(stations, null, 2))
}

module.exports = parseJson
