const Sequelize = require('sequelize')


const seq = new Sequelize('koa2_weibo_db','root','123456',{
    host:'81.70.51.246',
    dialect:'mysql'

})

module.exports = seq 


// seq.authenticate().then(()=>{
//     console.log('ok')
// })