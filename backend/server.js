// require('dotenv/config');
const mongoose=require('mongoose')
const app=require ('./app');
const MONGOdB_URL_LOCAL="mongodb://localhost:27017/BusLala2"
mongoose.connect(MONGOdB_URL_LOCAL,{
    useUnifiedTopology: true, useNewUrlParser: true
})
.then(()=> console.log('connected to Database'))
.catch((err)=>console.log('MongoDB connection failed'));

const port =3001

app.listen(port,()=>{
    console.log(`App running on port ${port}` )
})