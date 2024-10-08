
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
app.get('/taskslist',(req,res)=>{
   res.json([
    {
        "link": "https://intranet.youcode.ma/storage/users/profile/thumbnail/1125-1727859974.JPG",
        "name": "Amine Naboulsi",
        "task": "Outside",
        "rate": 20
    },
    {
        "link": "https://intranet.youcode.ma/storage/users/profile/thumbnail/1090-1727859809.JPG",
        "name": "Jawad Boulmal",
        "task": "Washing",
        "rate": 100
    },
    {
        "link": "https://intranet.youcode.ma/storage/users/profile/thumbnail/1127-1727859974.JPG",
        "name": "Ismail Dilali",
        "task": "Cleaning",
        "rate": 50
    },
    {
        "link": "https://intranet.youcode.ma/storage/users/profile/thumbnail/1086-1727859809.JPG",
        "name": "Youness Kamal",
        "task": "Cooking",
        "rate": 55
    }
])
})
app.use('/P' , ProductRouter)


app.listen(3044 , ()=>{console.log('working successfuly')}) ; 