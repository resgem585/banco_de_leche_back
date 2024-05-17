import { Schema, model, Types } from "mongoose";

const calidadSchema = new Schema({
  donante: {
    type: Types.ObjectId,
    ref: 'Donante',
    required: false
  },
  olor: {
    type: String,
    enum: ['Cumple', 'No cumple'],
    required: false
  },
});

export default model('Calidad', calidadSchema);