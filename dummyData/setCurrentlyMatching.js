const User = require('../database/models/user')
const Matches = require('../database/models/matches')
require('dotenv').config()
require('../database/db')
const readline = require('readline-sync')
const hostEmail = readline.question("Host Email: ")
const matching_user_email = readline.question("Matchi Email: ")




const setCurrentlyMatching = async ()=>{
    console.log('Searhing.....')
    console.log({
        hostEmail,
        matching_user_email
    })
    try{
        const hostUser = await User.findOne({
            email: hostEmail
        })
        const matching_user = await User.findOne({
            email: matching_user_email
        })
        if(!hostUser){
            throw new Error('Host user not found')
        }
        else if(!matching_user){
            throw new Error('No matching user')
        }
        await hostUser.populate('matches').execPopulate()
        console.log(hostUser.matches)
        
    }catch(e){
        console.log('Something went wrong!')
        console.log(`Message---->: ${e.message}`)
    }
}

setCurrentlyMatching()