
var bcrypt = require('bcryptjs');

var salt = ncrypt.genSaltSync(10);


bcrypt.hash('userpassword', encrypted, (err, res) => {
    console.log('hash, res')
    hash = res
    compare(res)
})

function compare(encrypted){
    bcrypt.compare('userpassword', encrypted, (err, res) => {
        console.log('Compared result', res, hash)
})
}