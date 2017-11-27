'use strict'
const path = require('path')
const spawn = require('child-process-promise').spawn
const config = require('config')
const basepath = config.basepath
const assert = require('assert')

module.exports = mkdvd
function mkdvd (parpath) {
  const scriptpath = path.join(__dirname, '../helpers/mkDVD.sh')
  assert(parpath.startsWith(basepath))
  const promise = spawn(scriptpath, [parpath])
  const child = promise.childProcess
  console.log(scriptpath, child.spawnargs)
  child.stdout.on('data', (data) => console.log(data.toString()))
  child.stderr.on('data', (data) => console.log(data.toString()))
  return promise
}
