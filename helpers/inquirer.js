require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tarea`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tarea completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tarea pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            },
        ]
    }
];



const inquiredMenu = async () => {

    console.clear();
    console.log('========================'.green);
    console.log('  Selecione una opcion'.green);
    console.log('========================\n'.green);

    const { option } = await inquirer.prompt( preguntas );

    return option;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(question);

}

const leer = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const borrar = async ( tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }`.green;
         return {
             value: tarea.id,
             name: `${ idx } ${ tarea.desc }`
         }
    });

    choices.unshift({
        type: '0',
        name: '0.'.green + 'Cancelar',
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarCheck = async ( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquiredMenu,
    pausa,
    leer,
    borrar,
    confirmar,
    mostrarCheck
}
