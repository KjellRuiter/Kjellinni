const User = require('../users/user.model');

module.exports = (user)=>{
    const allPossibleMatches = User
        .find({})
        .where('gender', user.gender === 'male' ? 'female' : 'male')
    
    const fitleredOut = allPossibleMatches.filter()
}