import User from "../models/User.js"
import Donante from "../models/Donante.js";
import Calidad from '../models/Calidad.js';


const Mutation = {
    // Donante
    async createDonante(_, { tipo, firstName }) {
        try {
          // Crear el nuevo Donante
          const newDonante = new Donante({ tipo, firstName });
          const donante = await newDonante.save();
    
          // Crear la nueva Calidad con el firstName del Donante
          const newCalidad = new Calidad({ donante: donante._id, firstName: donante.firstName });
          await newCalidad.save();
    
          return donante;
        } catch (error) {
          console.error("Error al crear Donante y Calidad:", error);
          throw error;
        }
      },
    async updateDonante(_, { _id, tipo, firstName }) {
      const updatedDonante = { tipo, firstName };
      return await Donante.findByIdAndUpdate(_id, updatedDonante, { new: true });
    },
  
    async deleteDonante(_, { _id }) {
      await Donante.findByIdAndDelete(_id);
      return await Donante.find();
    },
  
    // Calidad
    async createCalidad(_, { donante, olor }) {
        try {
          // Asegúrate de que 'donante' es un ObjectId y 'olor' no está vacío
          if (!donante || !olor) {
            throw new Error("Donante y olor son requeridos");
          }
      
          const newCalidad = new Calidad({ donante, olor });
          const calidad = await newCalidad.save();
          const calidadPopulada = await calidad.populate("donante");
          return calidadPopulada;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
  
    async updateCalidad(_, { _id, donante, olor }) {
      const updatedCalidad = { donante, olor };
      return await Calidad.findByIdAndUpdate(_id, updatedCalidad, { new: true }).populate("donante");
    },
  
    async deleteCalidad(_, { _id }) {
      return await Calidad.findByIdAndRemove(_id);
    },
  
    // USER
    async createUser(_, { email, password }) {
      const newUser = { email, password };
      const user = await User.create(newUser);
      return await User.find();
    },
  
    async updateUser(_, { _id, email, password }) {
      return await User.findByIdAndUpdate(_id, { email, password }, { new: true });
    },
  
    async deleteUser(_, { _id }) {
      const user = await User.findByIdAndDelete(_id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }
  };

  export default Mutation
