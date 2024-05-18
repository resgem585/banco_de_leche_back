import User from "../models/User.js";
import Donante from "../models/Donante.js";
import Calidad from "../models/Calidad.js";

const Query = {
  async getUser() {
    const users = await User.find();
    return users;
  },
  async login(_, { email, password }) {
    const verifyUser = await User.findOne({ email, password });
    return verifyUser;
  },
  // Donante
  async getDonantes() {
    const donantes = await Donante.find();
    return donantes;
  },
  async getDonante(_, { id }) { // Nueva query
    const donante = await Donante.findById(id);
    return donante;
  },


// Calidad

async getCalidades() {
  const calidades = await Calidad.find().populate('donante');
  return calidades;
},
async getCalidad(_, { id }) {
  const calidad = await Calidad.findById(id).populate('donante');
  console.log(calidad.donante.firstName);
  console.log(calidad.donante.sdg);
  return calidad;
},
}; 

export default Query;