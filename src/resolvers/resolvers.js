import Donante from "../models/Donante.js";

const resolvers = {
  Query: {
    // Tus resolvers de consulta van aquí
  },
  Mutation: {
    // Tus resolvers de mutación van aquí
  },
  Calidad: {
    donante: async (parent) => {
      const donante = await Donante.findById(parent.donante);
      return donante.firstName;
    }
  }
};

export default resolvers;