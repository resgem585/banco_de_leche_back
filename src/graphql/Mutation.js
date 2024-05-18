import User from "../models/User.js"
import Donante from "../models/Donante.js";


const Mutation = {
    //Donante
    async createDonante(_, { tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo, transfusionesUltimos5Anos, tatuajesPiercingsAcupunturaUltimoAno, tratamientoMedico, pruebaRapidaSifilis, pruebaRapidaVIH, pruebaRapidaHepatitisC, observaciones }) {
      
        // Crear el nuevo Donante con todos los campos proporcionados
        const newDonante = new Donante({ tipo, firstName, lastName, edad, direccion, ocupacion, partos, cesareas, apellidosRNLactante, sdg, fechaNacimRN, complicacionesEmbarazo, transfusionesUltimos5Anos, tatuajesPiercingsAcupunturaUltimoAno, tratamientoMedico, pruebaRapidaSifilis, pruebaRapidaVIH, pruebaRapidaHepatitisC, observaciones });
        const donante = await Donante.create(newDonante);
        return await Donante.find();
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

    }
}

export default Mutation;