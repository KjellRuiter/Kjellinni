const fetch = require('node-fetch')
const FormData = require('form-data')

/**
 * Saves a file in imgur as base64 and returns the image link in astring
 * @class Imgur.
 * @public
 * @param {file} - file you want to upload
 */
const imgur = async(file)=>{
    const base64   = new Buffer.from(file.buffer).toString('base64')
    const url      = 'https://api.imgur.com/3/image'
    const form     = new FormData()
    const cliendId = '8a49497fbb1b7c4'
    form.append('image', base64)
    const options = {
        method: 'POST',
        body: form,
        headers:{
            Authorization: `Client-ID ${cliendId}`
        }
    }
    const res   = await fetch(url,options)
    const json  = await res.json()
    console.log(json)
    return json.data.link
}

module.exports = imgur
