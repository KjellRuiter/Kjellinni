module.exports = (req, res)=>{
    res.render('pages/matchlist', { match })
   }

const getAcceptedMatches = (list)=> list.filter(user => user.status==='accepted')