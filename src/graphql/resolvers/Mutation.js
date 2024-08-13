import User from "../../models/User.js";
import Donante from "../../models/Donante.js";
import Calidad from "../../models/Calidad.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Clave secreta para firmar el JWT
const JWT_SECRET = process.env.JWT_SECRET;

const Mutation = {
  // Mutación para crear un nuevo usuario
  async createUser(_, { email, password }) {
    try {
      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      const user = await newUser.save();

      // Generar el token JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear el usuario');
    }
  },

  // Mutación para actualizar un usuario existente
  async updateUser(_, { _id, email, password }) {
    try {
      const updates = {};
      if (email) updates.email = email;
      if (password) updates.password = await bcrypt.hash(password, 10);

      const updatedUser = await User.findByIdAndUpdate(_id, updates, { new: true });
      if (!updatedUser) {
        throw new Error('Usuario no encontrado');
      }
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el usuario');
    }
  },

  // Mutación para eliminar un usuario
  async deleteUser(_, { _id }) {
    try {
      const user = await User.findByIdAndDelete(_id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar el usuario');
    }
  },

  // Mutación para eliminar todos los usuarios
  async deleteAllUsers() {
    try {
      const users = await User.find(); // Encontrar todos los usuarios antes de eliminarlos
      await User.deleteMany(); // Borrar todos los usuarios
      return users; // Retornar los usuarios eliminados
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar todos los usuarios');
    }
  },

  // Donante
  async createDonante(_, { tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo }, { user }) {
    if (!user) {
      throw new Error('Debe estar autenticado para crear un donante');
    }

    try {
      const newDonante = new Donante({
        userId: user.userId, // Asociar el donante con el usuario autenticado
        tipo,
        firstName,
        lastName,
        edad,
        direccion,
        ocupacion,
        partos,
        cesareas,
        apellidosRNLactante,
        sdg,
        fechaNacimRN,
        complicacionesEmbarazo
      });

      const donante = await newDonante.save();

      // Crear un nuevo documento Calidad cuando se crea un Donante
      const newCalidad = new Calidad({
        firstName: donante.firstName,
        donante: donante._id,
        sdg: donante.sdg
      });

      await newCalidad.save();

      return donante;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear el donante');
    }
  },

  async updateDonante(_, { _id, tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo, transfusionesUltimos5Anos, tatuajesPiercingsAcupunturaUltimoAno, tratamientoMedico, pruebaRapidaSifilis, pruebaRapidaVIH, pruebaRapidaHepatitisC, observaciones }) {
    try {
      const updatedDonante = {
        tipo,
        firstName,
        lastName,
        edad,
        direccion,
        ocupacion,
        partos,
        cesareas,
        apellidosRNLactante,
        sdg,
        fechaNacimRN,
        complicacionesEmbarazo,
        transfusionesUltimos5Anos,
        tatuajesPiercingsAcupunturaUltimoAno,
        tratamientoMedico,
        pruebaRapidaSifilis,
        pruebaRapidaVIH,
        pruebaRapidaHepatitisC,
        observaciones
      };
      return await Donante.findByIdAndUpdate(_id, updatedDonante, { new: true });
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el donante');
    }
  },

  async deleteDonante(_, { _id }) {
    try {
      const donante = await Donante.findByIdAndDelete(_id);
      if (!donante) {
        throw new Error('Donante no encontrado');
      }
      return donante;
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar el donante');
    }
  },

  // Calidad
  async createCalidad(_, { firstName, donanteId, sdg }) {
    try {
      const newCalidad = new Calidad({ firstName, donante: donanteId, sdg });
      const calidad = await newCalidad.save();
      return calidad;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear calidad');
    }
  },

  async updateCalidad(_, { _id, firstName, donanteId, sdg }) {
    try {
      const updatedCalidad = { firstName, donante: donanteId, sdg };
      return await Calidad.findByIdAndUpdate(_id, updatedCalidad, { new: true });
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar calidad');
    }
  },

  async deleteCalidad(_, { _id }) {
    try {
      const calidad = await Calidad.findByIdAndDelete(_id);
      if (!calidad) {
        throw new Error('Calidad no encontrada');
      }
      return calidad;
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar calidad');
    }
  },
};

export default Mutation;
