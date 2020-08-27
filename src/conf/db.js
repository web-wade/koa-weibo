/**
 * @description 存储配置
 */

let REDIS_CONF = {
    host: '81.70.51.246',
    port: 15001,
    password: '123456'
}


let MYSQL_CONF = {
    host: '81.70.51.246',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koa2_weibo_db',
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
