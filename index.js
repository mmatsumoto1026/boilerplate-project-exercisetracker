const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const connectDB = require('./db/connect')
const users = require('./routes/users')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(cors())
app.use(express.static('public'))
app.route('/api/users').post(bodyParser.urlencoded({extended: false}))
app.route('/api/users/:_id/exercises').post(bodyParser.urlencoded({extended: false}));
app.use('/api/users', users)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const listener = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
    console.log('Your app is listening on port ' + port)
    })
  } catch (error) {
    console.log(error);
  }
}

listener();
