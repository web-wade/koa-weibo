const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')

const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
    views(__dirname + '/views', {
        extension: 'ejs',
    })
)

app.keys = ['UISevE12$#']
app.use(
    session({
        key: 'weibo.sid', //cookie name
        prefix: 'weibo:sess', //redis key的前缀
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 1000,
        },
        // ttl: 24 * 60 * 1000, 
        store: redisStore({ all: `${REDIS_CONF.host}:${REDIS_CONF.port}` }),
    })
)
// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(userViewRouter.routes(), index.allowedMethods())
app.use(userApiRouter.routes(), index.allowedMethods())
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
