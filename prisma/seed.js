const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456789')
const userData = [
    {username : 'namtip', password: password, firstname: 'sureelux', lastname : 'pangkhamhak',address : '999 Nakonphanom',phone : '0999999999', email : 'sureelux2545@gmail.com'},
    {username : 'tip', password: password, firstname: 'namtip', lastname : 'pangkhamhak',address : '888 Nakonphanom',phone : '098888888', email : 'sureelux2545@gmail.com'}
]

// const todoData = [
//     { title:'Learn HTML', duedate: new Date(), userId: 7},
//     { title:'Learn CSS', duedate: new Date(), userId: 4},
//     { title:'Learn JS', duedate: new Date(), userId: 8},
//     { title:'Learn React', duedate: new Date(), userId: 9}
// ]


const run = async() => {      
    await prisma.user.createMany({
        data: userData
    })
    // await prisma.todo.createMany({
    //     data : todoData
    // })
}

run()