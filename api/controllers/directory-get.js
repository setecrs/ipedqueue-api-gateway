'use strict'

const util = require('util')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const config = require('config')
const basepath = config.basepath

function listItems(fullPath){
  return fs.readdirAsync(fullPath)
    .then(items => {
      return Array.from(new Set(items))
    })
    .map(item => {
      return fs.statAsync(path.join(fullPath, item))
        .then(stat => ({
          isDir: stat.isDirectory(),
        }),() => ({
          isDir: false,
        }))
        .then(obj => Object.assign(obj,{
          path: path.join(fullPath, item),
        }))
    })
    .map(item => {
      return listSubroutines(item.path)
        .then(subroutines => {
          //rm mkdvd
          if (subroutines[0] === 'mkdvd') {
            subroutines = subroutines.slice(1)
          }
          item.subroutines = subroutines
          return item
        })
    })
}

async function listSubroutines(path){
  try {
    const result = ['mkdvd']
    return result
  } catch (error) {
    console.log({error})
    return ['mkdvd']
  }
}

async function get (req, res) {
  try {
    const path = req.swagger.params.path.value || ''
    if (!path.startsWith(basepath)) {
      return res.status(403).end()
    }
    const contentPromise = listItems(path)
    const subroutinesPromise = listSubroutines(path)
    const content = await contentPromise
    const subroutines = await subroutinesPromise
    res.json({
      path,
      subroutines,
      content,
    })
  } catch (error) {
    console.log({error})
    res.status(500).json({message: util.format(error)})
  }
}

module.exports = (req, res) => get(req, res)
