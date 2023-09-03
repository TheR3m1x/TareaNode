// Cargar los datos de prueba en la base de datos
const fs = require('fs');
const mongoose = require('mongoose');
const Note = require('./models/Note'); // Asegúrate de importar tu modelo de notas

// Ruta al archivo notes.json
const notesFilePath = './notes.json';

// Configura la conexión a MongoDB (ajusta la cadena de conexión según tu configuración)
const mongoURI = 'mongodb+srv://juanalejandroe1:11588264@cluster0.taz3tow.mongodb.net/tareaDevops';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');

    // Lee los datos del archivo notes.json
    const notesData = JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));

    // Inserta los datos en la base de datos
    Note.insertMany(notesData)
      .then(() => {
        console.log('Datos de prueba insertados con éxito');
      })
      .catch((error) => {
        console.error('Error al insertar datos de prueba:', error);
      })
      .finally(() => {
        // Cierra la conexión a MongoDB cuando haya terminado
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
  });
