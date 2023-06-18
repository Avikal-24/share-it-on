require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const connectDB=require('./config/db')
connectDB()

app.use(express.static(__dirname + '/views'));
app.use(express.json()) //so it can accept json inputs
app.use(express.urlencoded({ extended: true }));  //important to destructure the form body (so it takes form-encoded data)

app.set('view engine', 'ejs');
app.set('views', 'views');

var cron = require('node-cron');

// cron.schedule('0 2 * * *', () => {
//   console.log('Running a job at 02:00 at "Asia/Kolkata" timezone');
//   cleanData = require('./clean')
//   cleanData();
// }, {
//   scheduled: true,
//   timezone: "Asia/Kolkata"
// });

cron.schedule('* * * * *', () => {
  console.log('Running a job every minute');
  cleanData = require('./clean')
  cleanData()

});

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Routes
app.use('/',require('./routes/upload'))
app.use('/download', require('./routes/download'))
app.use('/send', require('./routes/send'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})