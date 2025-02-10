const express = require('express')
const { resolve } = require('path')

const { logger } = require('./src/utils')

const app = express()

app.use('/', express.static(resolve(__dirname, './build')))

app.listen(process.env.PORT || 3000, error => {
  if (error) {
    return console.log(error)
  }
  logger.info('Ok')
})
