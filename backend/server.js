const express = require("express")
const deets = require("./data/deets")
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const deetRoutes = require('./routes/deetRoutes')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")
const path = require("path")

const app = express()
dotenv.config()
connectDB()
app.use(express.json()) 




// app.get('/api/deets', (req, res) => {
//   res.json(deets)
// })

app.use('/api/users', userRoutes)
app.use('/api/deets', deetRoutes)

// -------------------------deployment-------------

__dirname=path.resolve()
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', "build", "index.html"))
  })
}else {
  app.get('/', (req, res) => {
    res.send("API is running")
  })
}



// -------------------------deployment-------------


app.use(notFound)
app.use(errorHandler)


 
const PORT = process.env.PORT || 5000

app.listen(PORT ,console.log(`server at ${PORT}`))

