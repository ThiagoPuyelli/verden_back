const fs = require("fs");
const path = require("path");

module.exports = (directory, file) => {
    return fs.unlinkSync(path.join(__dirname + "/../uploads/" + directory + "/" + file));
}