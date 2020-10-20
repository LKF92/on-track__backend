require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const User = require("./resolvers/User");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const mongoose = require("mongoose");
const cors = require("cors");

const schemaFile = path.join(__dirname, "./schema/schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf-8");
const resolvers = { Query, Mutation, User };
const schema = makeExecutableSchema({ typeDefs, resolvers });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("connected to database!"));

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: (request) => {
      return { ...request };
    },
  })
);

app.listen(4000, () => console.log(`Server is up on port ${process.env.PORT}`));
