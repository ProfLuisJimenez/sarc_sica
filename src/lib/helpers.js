const bcrypt = require('bcrypt-nodejs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, passwordBD) => {
    try {       
        return await bcrypt.compare(password, passwordBD);
    } catch(e) {
        console.log(e);
    }
};

module.exports = helpers;