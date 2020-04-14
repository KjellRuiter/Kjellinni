module.exports = (data) => {
  // this function returns your partners image and name from the collection
  const who = {
    img: data[0].photo,
    name : data[0].name,
    id : data[0]._id
  } 
  return who
}
