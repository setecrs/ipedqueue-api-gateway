'use strict'

const fetch = require('node-fetch')
const config = require('config')
const basepath = config.basepath

const mkdvd = require('./mkdvd')

const mvURL = config.mvURL
const jobURL = config.jobURL

async function sendAction(res, method, url, body){
  try {
    const fetched = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    res.setHeader('Content-Type', 'application/json')
    res.status(fetched.status)
    fetched.body.pipe(res)
  } catch (error) {
    res.status(500).send({message: JSON.stringify(error)})
  }
}

function post (req, res) {
  const action = req.swagger.params.body.value.action
  const path = req.swagger.params.body.value.path
  const body = req.swagger.params.body.value
  if (!path.startsWith(basepath)) {
    return res.status(403).end()
  }
  delete body.action
  switch (action) {
  case 'mkdvd':
    return mkdvd(path)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json({message: JSON.stringify(error)}))
  case 'hold':
  case 'todo':
  case 'done':
  case 'failed':
  case 'running':
  {
    const url = jobURL + '/material/'+ path
    return sendAction(res, 'PUT', url, body)
  }
  case 'mv':
  {
    const url = mvURL + '/action'
    return sendAction(res, 'POST', url, body)
  }
  default:
    return res.status(404).json({message: 'unknown action', action: action})
  }
}

module.exports = post
