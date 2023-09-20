require("dotenv").config();
const Model= require('./models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");




async function get_user(user) {
console.log("ME ejecuto desde store get wallet", user);
const usuario = await Model.find(user).catch(e => {
    console.log("error");
    console.log(e);
  });
  console.log("Usuario", usuario);
  return usuario;
}


// Define una función asincrónica para guardar un usuario en la base de datos.
const set_user = async (userData) => {
  try {
    // Crea una instancia del modelo de usuarios con los datos proporcionados.
    const newUser = new Model({
      usuario: userData.usuario,
      referente: userData.referente,
      registrado: new Date(),
    });

    // Intenta guardar el nuevo usuario en la base de datos.
    const savedUser = await newUser.save();

    // Puedes devolver el usuario guardado si lo necesitas.
    return savedUser;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.usuario === 1) {
      // La clave duplicada se debe al campo "usuario"
      return [{ error: 'El nombre de usuario ya existe.' , usuario:userData.usuario, referente:userData.referente }];
    }

    // Otros errores pueden ser manejados aquí si es necesario.
    console.error('Error al guardar el usuario:', error);
    throw error; // Lanza el error para que pueda ser manejado en el llamador.
  }
};





module.exports = {
get_user,
set_user,
}


