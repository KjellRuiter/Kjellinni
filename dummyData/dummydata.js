const imgur = require('../helpers/imgur')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
require('../database/db')
const User = require('../database/models/user')
const Matches = require('../database/models/matches')
const bcrypt = require('bcryptjs')

const users = [
    {
        image: 'https://i.imgur.com/I2fhuCd.jpg',
        name: 'Gerard',
        email: 'gerard@hotmail.com',
        password: 'test123',
        age: 30,
        gender: 'Man',
    },
    {
        image: 'https://i.imgur.com/rLwjlxq.jpg',
        name: 'Kees',
        email: 'kees@hotmail.com',
        password: 'test123',
        age: 40,
        gender: 'Man',
    },
    {
        image: 'https://i.imgur.com/xygpDS1.jpg',
        name: 'Marjolein',
        email: 'marjolein@hotmail.com',
        password: 'test123',
        age: 18,
        gender: 'Vrouw',
    },
    {
        image: 'https://i.imgur.com/VYMNKoW.jpg',
        name: 'Henk',
        email: 'henk@hotmail.com',
        password: 'test123',
        age: 45,
        gender: 'Man',
    },
    {
        image: 'https://i.imgur.com/zwQSvEa.jpg',
        name: 'Thierry',
        email: 'thierry@hotmail.com',
        password: 'test123',
        age: 25,
        gender: 'Man',
    },
    {
        image: 'https://i.imgur.com/6ebOhet.png',
        name: 'Johny Bravo',
        email: 'johny@hotmail.com',
        password: 'test123',
        age: 22,
        gender: 'Man',
    },
    {
        image: 'https://i.imgur.com/hQ8ogsm.jpg',
        name:'Lois',
        email: 'lois@hotmail.com',
        password: 'test123',
        age: 38,
        gender: 'Vrouw',
    },
    {
        image: 'https://i.imgur.com/NKiTQgP.jpg',
        name:'Toasty Malony',
        email: 'toasty@hotmail.com',
        password: 'test123',
        age: 24,
        gender: 'Man',
    },
    {
        image: 'https://i.imgur.com/4KPE5YJ.jpg',
        name: 'Marge Simpson',
        email: 'marge@hotmail.com',
        password: 'test123',
        age: 45,
        gender: 'Vrouw',
    },
    {
        image: 'https://i.imgur.com/2UCwROy.png',
        name: 'Misty',
        email: 'misty@hotmail.com',
        password: 'test123',
        age: 18,
        gender: 'Vrouw',
    },
]

const savingUsers = users.map(async(user)=>{
    // const file = fs.readFileSync(path.join(__dirname,`images/${user.image}`))
    // let photo = null
    // try{
    //     const link = await imgur(file)
    //     photo = link 
    // } catch(e){
    //     console.log(`Something went wrong with the imgur upload ${e.message}`)
    // }
    const hash = bcrypt.hashSync(user.password, 10)
    const newUser = new User({
        name: user.name,
        gender: user.gender,
        photo: user.image,
        hash: hash,
        email: user.email
    })
    const matches = new Matches({
        owner: newUser._id
    })

    try{
        await newUser.save()
        await matches.save()
    }catch(e){
        console.log(e)
    }
    return newUser
})


Promise.all(savingUsers).then(users=>{
    console.log(users)
}).catch(e=>{
    console.log(`Something went wrong while saving ${e.message}`)
})
