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
  /* lastName: {
    type: String,
    required: false
  },
  edad: {
    type: Number,
    required: false
  },
  direccion: {
    type: String,
    required: false
  },
  ocupacion: {
    type: String
  },
  partos: {
    type: Number
  },
  cesareas: {
    type: Number
  },
  apellidosRNLactante: {
    type: String
  },
  sdg: {
    type: Number
  },
  fechaNacimRN: {
    type: Date,
    required: false
  },
  complicacionesEmbarazo: {
    type: String
  },
  transfusionesUltimos5Anos: {
    type: String,
    enum: ['Sí', 'No'],
    required: false
  },
  tatuajesPiercingsAcupunturaUltimoAno: {
    type: String,
    enum: ['Sí', 'No'],
    required: false
  },
  tratamientoMedico: {
    type: String
  },
  pruebaRapidaSifilis: {
    type: String,
    enum: ['No Reactivo', 'Reactivo'],
    required: false
  },
  pruebaRapidaVIH: {
    type: String,
    enum: ['No Reactivo', 'Reactivo'],
    required: false
  },
  pruebaRapidaHepatitisC: {
    type: String,
    enum: ['No Reactivo', 'Reactivo'],
    required: false
  },
  observaciones: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  } */
});

export default model('Donante', donanteSchema)