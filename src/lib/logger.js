'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const config = require('../config')
const log4js = require('log4js')

// 判断日志文件夹是否存在，不存在则创建
const logsDir = path.parse(config.log).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// 配置 log4js
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'dateFile', filename: config.log, pattern: '-yyyy-MM-dd' }
  ]
})

const logger = log4js.getDefaultLogger()

// 用于记录所有 HTTP 请求的 Middleware
const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  await next()

  const ms = new Date() - start
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips ||
    (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))

  logger.info(chalk.white.bgRed(`${ctx.method} ${ctx.status} ${ctx.url} - ${remoteAddress} - ${ms}ms`))
  logger.info('headers: \n' + util.inspect(ctx.headers, false, null, true))
  if (ctx.request.body) {
    if (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body).length === 0) return
    logger.info('body: \n' + util.inspect(ctx.request.body, false, null, true))
  }
}

module.exports = {
  logger,
  loggerMiddleware
}
