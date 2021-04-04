require('colors');
const { inquiredMenu, pausa, leer , borrar, confirmar, mostrarCheck} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {

           opt = await inquiredMenu();

           switch (opt) {
               case '1':
                    const desc = await leer('Descripción:');
                    tareas.crearTarea( desc );
               break;
               case '2':
                   console.log( tareas.listadoCompleto() );
               break;
               case '3':
                   console.log( tareas.listarPendienteCompletadas(true) );
               break;
               case '4':
                   console.log( tareas.listarPendienteCompletadas(false) );
               break;
               case '5':
                   const ids = await mostrarCheck( tareas.listadoArr );
                   tareas.toggleCompletadas(ids);
                   break;
               case '6':
                   const id = await borrar( tareas.listadoArr );
                   if ( id !== '0' ) {
                       const ok = await confirmar('¿Está seguro?');
                       if ( ok ) {
                           tareas.borrarTarea( id );
                           console.log('Tarea borrada');
                       }
                   }
               break;
           }

           guardarDB( tareas.listadoArr );

           await pausa();

    } while (opt !== '0');

}

main();
