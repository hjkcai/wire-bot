'use strict'

const path = require('path')

module.exports = {
  db: 'mongodb://localhost/',
  log: path.resolve(__dirname, '../logs/course-helper.log'),
  base: 'course-helper',
  port: '3003',
  root: 'http://iszu.cn',
  secret: 'iszu233'
}
