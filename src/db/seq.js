const Sequelize = require('sequelize')


const seq = new Sequelize('koa2_weibo_db','root','920916zl',{
    host:'localhost',
    dialect:'mysql'

})

module.exports = seq 


// seq.authenticate().then(()=>{
//     console.log('ok')
// })