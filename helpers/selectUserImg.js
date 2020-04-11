module.exports = (data, userName) => {
  // this function returns your partners image and name from th ecollection
  const who = {}
  if (userName == data[0].hisName) {
    who.img = data[0].herImage
    who.name = data[0].name
    who.id = data[0].roomID
  } else {
    who.img = data[0].hisImage
    who.name = data[0].hisName
    who.id = data[0].roomID
  }
  return who
}
