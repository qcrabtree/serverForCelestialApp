require('dotenv').config();

let express = require('express');
let app = express();
let User = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');
let sequelize = require('./db');
let bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/user', User);
app.use(require('./middleware/validate-session'));
app.use('/log', log);


app.use('/api/log', log);

app.listen(process.env.PORT, () => {
    console.log(`Celestial App Server is listening on port ${process.env.PORT}`)
})


