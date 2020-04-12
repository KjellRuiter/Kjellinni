const User = require('../database/models/user')
const Matches = require('../database/models/matches')
require('dotenv').config()
require('../database/db')
const readline = require('readline-sync')
const email = readline.question("Type the email to populate with matches: ")

const balling = async ()=>{
    console.log('Searhing.....')
    try{
        const user = await User.findOne({
            email
        })
        if(!user.gender){
            throw new Error('No gender has been set')
        }
        await user.populate('matches').execPopulate()
        const matches = user.matches
        
        const allUsers = await User.find({
            gender: user.gender === 'Man' ? 'Vrouw' : 'Man'
        })
        const allIds = allUsers.filter(user=>!matches.otherUser_accepted.find(id=>id.equals(user._id))).map(user=>user._id)
        if(allIds.length === 0){
            console.log('Nothing to update')
            process.exit()
        }
        await Matches.findByIdAndUpdate(matches._id, {
            otherUser_accepted : allIds
        })
        
    }catch(e){
        console.log('Something went wrong!')
        console.log(`Message---->: ${e.message}`)
    }
}

balling()

console.log("Hi " + email + ", nice to meet you.")