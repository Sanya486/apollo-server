import Car from "../models/Car.js";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number" || typeof value === "string") {
      return new Date(value).getTime(); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});



const resolvers = {
  Date: dateScalar,
  Query: {
    getCar: async (_, { id }) => {
      try {
        const user = await Car.findById(id);
        return user;
      } catch (err) {
        throw new Error("Error retrieving car");
      }
    },
    getCars: async () => {
      try {
        const cars = await Car.find();
        return cars;
      } catch (err) {
        throw new Error("Error retrieving cars");
      }
    },
  },
  Mutation: {
    createCar: async (_, {brand, model, color, horsePowers }) => {
      try {
        const car = new Car({ brand, model, color, horsePowers });
        await car.save();
        return car;
      } catch (err) {
        throw new Error("Error creating car");
      }
    },
    updateCar: async (_, { id, brand, model, color, horsePowers }) => {
      try {
        const car = await Car.findByIdAndUpdate(
          id,
          { brand, model, color, horsePowers },
          { new: true }
        );
        return car;
      } catch (err) {
        throw new Error("Error updating car");
      }
    },
    deleteCar: async (_, { id }) => {
      try {
        const car = await Car.findByIdAndDelete(id);
        return car;
      } catch (err) {
        throw new Error("Error deleting car");
      }
    },
  },
};

export default resolvers;
