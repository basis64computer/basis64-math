let defaultPassword = "bjLm2JP6YvPiejE4Z6Z+5sX+P2qIEqv9YIZ3fuF15Zw=";

function encryptPassword(argument) {
    const iv = CryptoJS.enc.Utf8.parse('678025308de70905');

    const keyutf = CryptoJS.enc.Utf8.parse(password);
    let encrypted = CryptoJS.AES.encrypt(password, keyutf, {iv: iv});

    return encrypted;
}

function decryptPassword(password) {
    const iv = CryptoJS.enc.Utf8.parse('678025308de70905');

    const keyutf = CryptoJS.enc.Utf8.parse(password);
    let decrypted = CryptoJS.AES.decrypt(defaultPassword, keyutf, {iv: iv});

    return decrypted;
}

function checkPassword(password) {
    let decrypted = decryptPassword(password);
    return (password == decrypted);
}
