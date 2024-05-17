import { Schema, model } from "mongoose";

// Definir el esquema del modelo 'Donante'
const donanteSchema = new Schema({
  tipo: {
    type: String,
    enum: ['Homóloga', 'Heteróloga'],
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
});

export default model('Donante', donanteSchema)