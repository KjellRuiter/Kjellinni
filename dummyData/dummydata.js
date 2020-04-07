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
        image: '1.jpeg',
        name: 'Gerard',
        email: 'gerard@hotmail.com',
        password: 'test123',
        age: 30,
        gender: 'Man',
    },
    {
        image: '2.jpg',
        name: 'Kees',
        email: 'kees@hotmail.com',
        password: 'test123',
        age: 40,
        gender: 'Man',
    },
    {
        image: '3.jpeg',
        name: 'Marjolein',
        email: 'marjolein@hotmail.com',
        password: 'test123',
        age: 18,
        gender: 'Vrouw',
    },
    {
        image: '4.jpg',
        name: 'Henk',
        email: 'henk@hotmail.com',
        password: 'test123',
        age: 45,
        gender: 'Man',
    },
    {
        image: '5.jpg',
        name: 'Thierry',
        email: 'thierry@hotmail.com',
        password: 'test123',
        age: 25,
        gender: 'Man',
    },
    {
        image: 'johny_bravo.png',
        name: 'Johny Bravo',
        email: 'johny@hotmail.com',
        password: 'test123',
        age: 22,
        gender: 'Man',
    },
    {
        image: 'lois.jpg',
        name:'Lois',
        email: 'lois@hotmail.com',
        password: 'test123',
        age: 38,
        gender: 'Vrouw',
    },
    {
        image: 'malone.jpg',
        name:'Toasty Malony',
        email: 'toasty@hotmail.com',
        password: 'test123',
        age: 24,
        gender: 'Man',
    },
    {
        image: 'marge.jpg',
        name: 'Marge Simpson',
        email: 'marge@hotmail.com',
        password: 'test123',
        age: 45,
        gender: 'Vrouw',
    },
    {
        image: 'misty.png',
        name: 'Misty',
        email: 'misty@hotmail.com',
        password: 'test123',
        age: 18,
        gender: 'Vrouw',
    },
]

const savingUsers = users.map(async(user)=>{
    const file = fs.readFileSync(path.join(__dirname,`images/${user.image}`))
    let photo = null
    try{
        const link = await imgur(file)
        photo = link 
    } catch(e){
        console.log(`Something went wrong with the imgur upload ${e.message}`)
    }
    console.log(photo)
    const hash = bcrypt.hashSync(user.password, 10)
    const newUser = new User({
        name: user.name,
        gender: user.gender,
        photo: photo,
        hash: hash,
        email: user.email
    })
    console.log('saving??')
    try{
        await newUser.save()
    }catch(e){
        console.log(e)
    }
    return newUser
})


Promise.all(savingUsers).then(users=>{
    // console.log(users)
})
