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
        if(hostUser._id.equals(matching_user._id)){
            throw new Error('Cant be same id')
        }
        const checkIfAlreadyMatched = hostUser.matches.find(user=>user.userId.equals(matching_user._id))
        if(checkIfAlreadyMatched){
            throw new Error('You have already matched with this user!')
        }
        await Matches.findByIdAndUpdate(hostUser.matches._id, {
            currentlyMatching: matching_user._id
        })
        console.log(`Succesfully set the matching user ${matching_user}`)
        
    }catch(e){
        console.log('Something went wrong!')
        console.log(`Message---->: ${e.message}`)
    }
}

setCurrentlyMatching()