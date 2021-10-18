const exppress = require('express');
const app = exppress();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*',cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


//Routes
const userRouter = require('./routers/users');
const vehicleRouter = require('./routers/vehicles');
const adressRouter = require('./routers/adresses');
const orderRouter = require('./routers/orders');
const uploadFileRouter = require('./routers/uploadFile');
const orderstatusRouter = require('./routers/orderstatus');

const api = process.env.API_URL;

app.use(`${api}`,userRouter);
app.use(`${api}`,vehicleRouter);
app.use(`${api}`,adressRouter);
app.use(`${api}`,orderRouter);
app.use(`${api}`,uploadFileRouter);
app.use(`${api}`,orderstatusRouter);

//database
const dbName = 'hizli-kurye-db';
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,   
    useUnifiedTopology: true,
    dbName: dbName,
    useFindAndModify: false
})
.then(()=>{
    console.log(dbName+" --> Hazir");
})
.catch((err)=> {
    console.log(err);
})


//server
const portRakam = 3000;
const port = process.env.port || portRakam;

console.log("api --> "+api);
console.log("port --> "+port);
console.log("process.env.port --> " + process.env.port);
console.log("portRakam --> "+portRakam);


app.listen(port,()=>{
    console.log("http://{IP}:"+portRakam+api+" --> Hazir");
})