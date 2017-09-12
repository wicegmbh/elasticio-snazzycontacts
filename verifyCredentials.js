module.exports = verify;

function verify(credentials, cb) {

    console.log('About to verify credentials');

    if (!credentials.email) {
        console.log('Invalid email');
        return cb(null, {verified: false});
    }

    if (!credentials.apikey) {
        console.log('Invalid API key');
        return cb(null, {verified: false});
    }

    console.log('Successfully verified credentials');

    cb(null, {verified: true});
}

