const schema = `#graphql
scalar Date
  type Car {
    id: ID!
    brand: String!
    model: String!
    color: String
    horsePowers: String
    createdDate: Date!
  }

  type Query {
    getCar(id: ID!): Car
    getCars: [Car]
  }

  type Mutation {
    createCar(brand: String!, model: String!, color: String, horsePowers: String, createdDate: Date!): Car
    updateCar(id: ID!, brand: String, model: String, color: String, horsePowers: String, createdDate: Date): Car
    deleteCar(id: ID!): Car
  }
`;

export default schema;
