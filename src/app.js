const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const { isProd } = require('./utils/env')
const combineRoutes = require('koa-combine-routers')

const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')
const userApiRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')

const { REDIS_CONF } = require('./conf/db')

// error handler
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

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
        store: redisStore({
            host: REDIS_CONF.host,
            port: REDIS_CONF.port,
            password: REDIS_CONF.password,
        }),
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
const routers = combineRoutes(
    index,
    userViewRouter,
    utilsAPIRouter,
    userApiRouter,
    errorViewRouter,
)
app.use(routers())
// app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
// app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
// app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
