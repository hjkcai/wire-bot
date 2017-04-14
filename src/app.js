'use strict'

const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const { loggerMiddleware } = require('./lib/logger')
const { responseHandler, errorHandler } = require('./lib/response')

const app = new Koa()
const router = require('./routes')

app.use(loggerMiddleware)
app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())
app.use(koaStatic(path.resolve(__dirname, './public')))
// app.use(responseHandler)

module.exports = app
