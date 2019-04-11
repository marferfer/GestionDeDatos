const mongoose = require('mongoose');

//Conectar con mongodb
mongoose.connect('mongodb://localhost/27017');



mongoose.connection.once('open', function(){
    console.log('Conexion se ha hecho, ahora a trabajar');
}).on('error', function(error){
    console.log('Conexion fallida: ', error); 
});