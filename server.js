

/**
 * 
 * 1. kunna visa all info i databasen 
 * 2. kunna lägga till i databasen
 * 3. kunna köpa biljetter 
 * 4. logga in som staff / admin
 * 
 * 
 * 
 * 
 const low = require('lowdb');
 const FileSync = require('lowdb/adapters/FileSync')
 const adapter = new FileSync('database.json')
 const { Router } = require('express');
 const router = new Router();
 */





const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const displayEvents = require('./routes/displayEvents');
const createEvent = require('./routes/createEvent');
const buyTicket = require('./routes/buyTicket');
const verifyApp = require('./routes/verifyTicket');
const loginRouter = require('./routes/login');
const accountRouter = require('./routes/account');

const app = express();

app.use(express.static('view'));
app.use(cookieParser());
app.use(bodyParser.json());


//Endpoints
app.use("/api/events", displayEvents);
app.use('/api/create/', createEvent);
app.use('/api/buy/event', buyTicket);
app.use('/api/verify/ticket', verifyApp);
app.use('/api/auth', loginRouter);
app.use('/api/account', accountRouter);




app.listen(8000, () => {
    console.log('Server is running on port 8000');
})