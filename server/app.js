// given app route for express
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const uri = "mongodb+srv://timidgeek:osiULSObIdv8xUfQ@graphqlcluster.1i6fopo.mongodb.net/?retryWrites=true&w=majority";

// connect to database
mongoose.connect(uri);

// mongodb connection log
mongoose.connection.once('open', () =>
  console.log('connected to database'),
  );

// connect to graphiql
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

// server connection log
app.listen(4000,() => {
  console.log('now listening for request on port 4000');
});

// "add this line of code" cors
// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // if you're using cookies or sessions
  })
);