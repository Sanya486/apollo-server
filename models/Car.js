import { Schema, model } from "mongoose";

const carSchema = Schema({
  brand: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  color: {
    type: String,
  },
  horsePowers: {
    type: Number,
  },
  createdDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Car = model("cars", carSchema);

export default Car;
