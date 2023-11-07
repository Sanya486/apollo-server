import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import schema from "./graphql/Schema.js";
import resolvers from "./graphql/Resolvers.js";
import mongoose from "mongoose";

dotenv.config();

const { DB_HOST } = process.env;

await mongoose.connect(DB_HOST);
console.log("Connected to MDB")

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
