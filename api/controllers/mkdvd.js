'use strict'

const util = require('util')
const path = require('path')
const spawn = require('child-process-promise').spawn
const config = require('config')
const basepath = config.basepath

module.exports = mkdvd
function mkdvd (parpath) {
  const scriptpath = path.join(__dirname, '../helpers/mkDVD.sh')
  const promise = spawn(scriptpath, [path.join(basepath, parpath)])
  const child = promise.childProcess
  console.log(scriptpath, child.spawnargs)
  child.stdout.on('data', (data) => console.log(data.toString()))
  child.stderr.on('data', (data) => console.log(data.toString()))
  return promise
}
