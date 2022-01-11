
const translate = require('translate-google')

translate(process.argv[2], {to: process.argv[3]}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})


