module.exports = (allMatches, partnersId) => {
    const splicedArray = allMatches.filter(match => match.userId !== partnersId)

    return splicedArray
  }
  