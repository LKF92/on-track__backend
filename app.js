require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const User = require("./resolvers/User");
const Artist = require("./resolvers/Artist");
const Label = require("./resolvers/Label");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const mongoose = require("mongoose");
const cors = require("cors");

const schemaFile = path.join(__dirname, "./schema/schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf-8");
const resolvers = { Query, Mutation, User, Artist, Label };
const schema = makeExecutableSchema({ typeDefs, resolvers });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.once("open", () => console.log("connected to database!"));

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP((request) => ({
    schema: schema,
    graphiql: true,
    context: { request: { ...request } },
  }))
);

app.use("/", (req, res) => res.send("this is a test"));
app.listen(process.env.PORT, () => console.log(`Server is up on port ${process.env.PORT}`));
