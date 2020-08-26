const User = require('./User')
const Blog = require('./Blog')

// 外键关联
Blog.belongsTo(User, {
    //创建外键 Blog.userId -> User.id
    foreignKey: 'userId',
})

User.hasMany(Blog, {
    foreignKey: 'userId',
})

module.exports = { User, Blog }
