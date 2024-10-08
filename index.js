
const { mongoose } = require('mongoose');const ProductRouter = require('./Router/productRouter') ;
const cors = require('cors');
const express = require('express') ;
const app = express() ;
app.use(cors());
const dotenv = require('dotenv')
dotenv.config()
/* const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); */
mongoose.connect(process.env.URIDB ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
/*------------------------------------------------------Listen-----------------------------------------------------*/ 
app.get('/',(req,res)=>{
   res.json({message : 'libiiti get'})
})
app.use('/P' , ProductRouter)


app.listen(3044 , ()=>{console.log('working successfuly')}) ; 