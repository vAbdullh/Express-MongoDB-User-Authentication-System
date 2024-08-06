const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    try {

        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        return hash

    } catch (err) {
        console.log(`error occur: ${err}`);
        return false
    }
}
const compareHashedPassword = async (password, hashed) => {
    try {

        return await bcrypt.compare(password, hashed)

    } catch (err) {
        console.log(`error occur: ${err}`);
        return false
    }
}

function checkUsername(username) {
    return /^[\w]+$/.test(username)
}
function checkName(username) {
    return /^[a-zA-Z\s]{3,}$/.test(username);
}
module.exports = { hashPassword, compareHashedPassword, checkName, checkUsername };