const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            //{url: `/\/api\/v1\/products(.*)/`, methods: ['GET','OPTIONS'] }, //products linkinden sonra ne gelirse gelsin unless olacak
            `${api}/login`,
            `${api}/register`
        ]
    })
}



//Veritabanında ki adminmi kısmını token içine yazılan kısım.
async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        //done(null, true)
        done()
    }

    done();
}


module.exports = authJwt;