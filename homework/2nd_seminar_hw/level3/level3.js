const crypto = require('crypto');
const fs = require('fs');

const password = '곱창먹구싶다';
const fileName = 'Encrypted_password';
const salt = '곱창말고대창은?';

const encrypt = (salt, password) => {
    return new Promise( (resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
            if(err) reject(err);
            resolve(key.toString('base64'));
        });
    });
}

encrypt(salt, password)
    .then( key => {
        fs.writeFile(`${fileName}.txt`, key, () => {
            console.log('Success!');
        });
    });