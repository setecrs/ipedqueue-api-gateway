'use strict'

const util = require('util')
const fetch = require('node-fetch')
const config = require('config')

const mvURL = config.mvURL

async function getRunning(){
  const url = mvURL + '/running'
  const fetched = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
  const json = await fetched.json()
  return json
}

async function get (req, res) {
  try {
    const contentPromise = getRunning()
    const content = await contentPromise
    res.json(content)
  } catch (error) {
    console.log({error})
    res.status(500).json({message: util.format(error)})
  }
}

module.exports = (req, res) => get(req, res)
