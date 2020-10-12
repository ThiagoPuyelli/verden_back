const bcrypt = require("bcryptjs");

module.exports = (password, realPassword) => {
    return bcrypt.compareSync(password, realPassword);
}