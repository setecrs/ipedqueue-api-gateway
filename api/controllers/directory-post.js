'use strict'

const fetch = require('node-fetch')
const config = require('config')
const basepath = config.basepath

const mkdvd = require('./mkdvd')

const mvURL = config.mvURL

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
    case 'mv':
      return (async () => {
        try {
          const url = mvURL + '/action'
          const fetched = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          res.setHeader('Content-Type', 'application/json')
          res.status(fetched.status)
          fetched.body.pipe(res)
        } catch (error) {
          console.log('Error: directory-post mv:', {error})
          res.status(500).send({message: JSON.stringify(error)})
        }
      })()
    default:
      return res.status(404).json({message: 'unknown action', action: action})
  }
}

module.exports = post
