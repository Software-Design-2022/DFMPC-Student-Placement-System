var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);


export default bcrypt.hash('userpassword', encrypted, (err, res) => {
    console.log('hash, res')
    hash = res
    compare(res)
})

export function compare(encrypted) {
    bcrypt.compare('userpassword', encrypted, (err, res) => {
        console.log('Compared result', res, hash)
    })
}