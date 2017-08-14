const parserJson = require('./parser-json')
const path = require('path')

const main = () => {
  if (process.argv.length != 4) {
    console.error('Invalid argumments')
  }

  const nodePath = process.argv[0]
  const ifile = path.join(__dirname, process.argv[2])
  const ofile = path.join(__dirname, process.argv[3])

  console.log(`Reading ${ifile}, writing: ${ofile}`)
  parserJson(ifile, ofile)
    .then(() => console.log('JSON parsed'))
    .catch(err => console.error(err))
}

main()
