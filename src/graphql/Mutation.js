import User from "../models/User.js"
import Donante from "../models/Donante.js";
import Calidad from "../models/Calidad.js";



const Mutation = {
    //Donante
    async createDonante(_, { tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo }) {
      const newDonante = new Donante({ tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo });
      const donante = await Donante.create(newDonante);
  
      // Crear un nuevo documento Calidad cuando se crea un Donante
      const newCalidad = new Calidad({ firstName: donante.firstName, donante: donante._id, sdg: donante.sdg });
      await Calidad.create(newCalidad);
  
      return donante;
    },
    async updateDonante(_, {_id, tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo, transfusionesUltimos5Anos, tatuajesPiercingsAcupunturaUltimoAno, tratamientoMedico, pruebaRapidaSifilis, pruebaRapidaVIH, pruebaRapidaHepatitisC, observaciones}) {
        const updatedDonante = {tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo, transfusionesUltimos5Anos, tatuajesPiercingsAcupunturaUltimoAno, tratamientoMedico, pruebaRapidaSifilis, pruebaRapidaVIH, pruebaRapidaHepatitisC, observaciones};
        return await Donante.findByIdAndUpdate( _id, updatedDonante, { new: true });
    },
      async deleteDonante(_, { _id }) {
        await Donante.findByIdAndDelete( _id );
        return await Donante.find();
    },

    // USER
    async createUser(_, {email, password }){
        const newUser = { email, password}
        const user = await User.create( newUser )
        return await User.find() // puede ser solo user, regresar el usuario.
    },
    async updateUser(_, { _id, email, password } ){
        return await User.findByIdAndUpdate(_id, { email, password, }, {new: true})
    },
    async deleteUser( _, {_id}){
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            
         throw new Error('User not found');
        }
        return user
    },
    async createCalidad(_, { firstName, donanteId, sdg }) {
      const newCalidad = new Calidad({ firstName, donanteId, sdg });
      const calidad = await Calidad.create(newCalidad);
      return await Calidad.find();
    },
    async updateCalidad(_, { _id, firstName, donanteId, sdg }) {
      const updatedCalidad = { firstName, donanteId, sdg };
      return await Calidad.findByIdAndUpdate(_id, updatedCalidad, { new: true });
    },
    async deleteCalidad(_, { _id }) {
      await Calidad.findByIdAndDelete(_id);
      return await Calidad.find();
    },

}


export default Mutation;