module.exports = (allMatches) => {
const newMatches = allMatches.filter(match => match.lastMessage == "");
const oldMatches = allMatches.filter(match => match.lastMessage !== "");
const matches = {
    old: oldMatches,
    new: newMatches
}
return matches
}