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
const api = process.env.API_URL;


app.use(`${api}`,userRouter);

//database
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,   
    useUnifiedTopology: true,
    dbName: 'hizli-kurye-db'
})
.then(()=>{
    console.log("db hazır");
})
.catch((err)=> {
    console.log(err);
})

//server
app.listen(3000,()=>{
    console.log(api);
    console.log("sa");
})