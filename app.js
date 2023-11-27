const express = require ('express');
const mongoose = require ('mongoose');
const authRoute = require ('./Routes/authRoute')
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.json());

//View engine
app.set('view engine', 'ejs');

//MongoDB
// const dbURI = 'mongodb+srv://Seven:Awesome6@cluster0.rfsjhpk.mongodb.net/node-auth';
// mongoose.connect(dbURI, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     useCreateIndex: true})
// .then((result) => app.listen(3000))
// .catch((err) => console.log(err));
// .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

//MongoDB
const dbURI = 'mongodb+srv://Seven:Awesome6@cluster0.rfsjhpk.mongodb.net/node-auth';

async function main() {
  const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

 //schema, Model and Indexing
    const collection = client.db('node-auth').collection('users');
    await collection.createIndex({ User: 1 }, { unique: true });
    console.log('Index created successfully');

    // Start Express app
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

//Server
app.listen(3000);
console.log('Got it!');

//Routes
app.get('/', (req,res) => res.render('Home'));
app.get('/smoothies', (req,res) => res.render('smoothies'));
app.use(authRoute);

