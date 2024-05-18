import { Schema, model } from "mongoose";

// Definir el esquema del modelo 'Calidad'
const calidadSchema = new Schema({
  firstName: {
    type: String,
    required: false
  },
  donante: {
    type: Schema.Types.ObjectId,
    ref: 'Donante',
    required: false
  },
  sdg: {
    type: String,
    required: false
  },
  // Agrega aquí cualquier otro campo que necesites para tu modelo 'Calidad'
});

// Crear el modelo 'Calidad' a partir del esquema
export default model('Calidad', calidadSchema)