import User from "../models/User.js";
import Donante from "../models/Donante.js";

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
};

export default Query;