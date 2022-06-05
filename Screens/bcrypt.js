var bcrypt = require("bcryptjs"); // var bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10);

export default bcrypt.hash("userpassword", encrypted, (err, res) => {
  console.log("hash, res"); // Prints the hash
  hash = res; // Store hash in a variable to reuse later
  compare(res); // Compare a password against a hash
});

export function compare(encrypted) {
  bcrypt.compare("userpassword", encrypted, (err, res) => {
    // res = true
    console.log("Compared result", res, hash); // Prints true
  });
}
