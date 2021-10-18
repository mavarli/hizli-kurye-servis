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
            //{url: `/\/api\/v1\/user(.*)/`, methods: ['GET','OPTIONS'] }, //products linkinden sonra ne gelirse gelsin unless olacak
            {url: `/\/api\/v1\/courier(.*)/`, methods: ['GET','OPTIONS'] },
            `${api}\/user\/.*/`,
            `${api}/loginUser`,
            `${api}/loginCourier`,
            `${api}/register`,
            `${api}/courier`,
            `${api}\/userphone\/.*/`,
            `${api}/user`,
            `${api}/orderstatus`,
            `${api}/uploadPicture`            
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