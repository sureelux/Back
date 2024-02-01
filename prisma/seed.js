const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456789')
const userData = [
    {username : 'namtip', password: password, email: "namtip123@gmail.com"},
    {username : 'tip', password: password, email: "tip123@gmail.com"},
    {username : 'kron', password: password, email: "kron123@gmail.com"},
    {username : 'meol', password: password, email: "meol123@gmail.com"},
    {username : 'dodo', password: password, email: "dodo123@gmail.com"},
    {username : 'donut', password: password, email: "donut123@gmail.com"},
    {username : 'best', password: password, email: "best123@gmail.com"},
    {username : 'soda', password: password, email: "soda123@gmail.com"},
    {username : 'pim', password: password, email: "pim123@gmail.com"},
    {username : 'out', password: password, email: "out123@gmail.com"}
]

const todoData = [
    { title:'Learn HTML', duedate: new Date(), user_id: 7},
    { title:'Learn CSS', duedate: new Date(), user_id: 4},
    { title:'Learn JS', duedate: new Date(), user_id: 8},
    { title:'Learn React', duedate: new Date(), user_id: 9}
]


const run = async() => {
    // await prisma.user.deleteMany({})
    // await prisma.user.createMany({
    //     data : userData
    // })

      
    await prisma.user.createMany({
        data: userData
    })
    await prisma.todo.createMany({
        data : todoData
    })
}

run()
