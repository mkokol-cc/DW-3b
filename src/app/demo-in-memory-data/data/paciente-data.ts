import { Paciente } from "../../model/paciente";

// Función para generar un número aleatorio entre "1" y "7" como string
function getRandomCliente(): string {
    return Math.floor(Math.random() * 7 + 1).toString();
}

export const PACIENTES: any[] = [
    {   
        id: '1', 
        cliente: getRandomCliente(),
        nombre: 'Juan', 
        apellido: 'Pérez', 
        dni: 30123456, 
        correoElectronico: 'juan.perez@gmail.com', 
        telefono: 1123456789, 
        password: 'juan1234' 
    },
    {   
        id: '2', 
        cliente: getRandomCliente(),
        nombre: 'María', 
        apellido: 'Gómez', 
        dni: 35198765, 
        correoElectronico: 'maria.gomez@hotmail.com', 
        telefono: 1198765432, 
        password: 'mgomez89' 
    },
    {   
        id: '3', 
        cliente: getRandomCliente(),
        nombre: 'Carlos', 
        apellido: 'López', 
        dni: 28987654, 
        correoElectronico: undefined, 
        telefono: 1145678901, 
        password: 'carlosL' 
    },
    {   
        id: '4', 
        cliente: getRandomCliente(),
        nombre: 'Ana', 
        apellido: 'Martínez', 
        dni: undefined, 
        correoElectronico: 'ana.martinez@yahoo.com', 
        telefono: 1176543210, 
        password: 'ana456' 
    },
    {   
        id: '5', 
        cliente: getRandomCliente(),
        nombre: 'Luis', 
        apellido: 'Rodríguez', 
        dni: 40123456, 
        correoElectronico: 'luis.r@gmail.com', 
        telefono: undefined, 
        password: undefined 
    },
    {   
        id: '6', 
        cliente: getRandomCliente(),
        nombre: 'Sofía', 
        apellido: 'Díaz', 
        dni: 32165498, 
        correoElectronico: undefined, 
        telefono: 1187654321, 
        password: 'sofiaDiaz' 
    },
    {   
        id: '7', 
        cliente: getRandomCliente(),
        nombre: 'Pedro', 
        apellido: 'Sánchez', 
        dni: 27123456, 
        correoElectronico: 'pedro.sanchez@outlook.com', 
        telefono: undefined, 
        password: undefined 
    },
    {   
        id: '8', 
        cliente: getRandomCliente(),
        nombre: 'Lucía', 
        apellido: 'Fernández', 
        dni: 39123456, 
        correoElectronico: 'lucia.f@gmail.com', 
        telefono: 1134567890, 
        password: 'luciaF12' 
    },
    {   
        id: '9', 
        cliente: getRandomCliente(),
        nombre: 'Diego', 
        apellido: 'García', 
        dni: 34198765, 
        correoElectronico: 'diego.garcia@gmail.com', 
        telefono: 1165432109, 
        password: 'diego789' 
    },
    {   
        id: '10', 
        cliente: getRandomCliente(),
        nombre: 'Elena', 
        apellido: 'Ruiz', 
        dni: 26123456, 
        correoElectronico: undefined, 
        telefono: 1120987654, 
        password: 'elenaR' 
    },
    {   
        id: '11', 
        cliente: getRandomCliente(),
        nombre: 'Miguel', 
        apellido: 'Torres', 
        dni: 42198765, 
        correoElectronico: 'miguel.t@hotmail.com', 
        telefono: undefined, 
        password: 'miguelT' 
    },
    {   
        id: '12', 
        cliente: getRandomCliente(),
        nombre: 'Clara', 
        apellido: 'Ramírez', 
        dni: undefined, 
        correoElectronico: 'clara.r@yahoo.com', 
        telefono: 1156789012, 
        password: 'clara123' 
    },
    {   
        id: '13', 
        cliente: getRandomCliente(),
        nombre: 'Javier', 
        apellido: 'Moreno', 
        dni: 38123456, 
        correoElectronico: 'javier.m@gmail.com', 
        telefono: 1178901234, 
        password: undefined 
    },
    {   
        id: '14', 
        cliente: getRandomCliente(),
        nombre: 'Valeria', 
        apellido: 'Ortega', 
        dni: 31165498, 
        correoElectronico: undefined, 
        telefono: 1143210987, 
        password: 'valeriaO' 
    },
    {   
        id: '15', 
        cliente: getRandomCliente(),
        nombre: 'Andrés', 
        apellido: 'Castro', 
        dni: 29123456, 
        correoElectronico: 'andres.c@outlook.com', 
        telefono: 1190123456, 
        password: 'andresC' 
    },
    {   
        id: '16', 
        cliente: getRandomCliente(),
        nombre: 'Paula', 
        apellido: 'Vega', 
        dni: 36198765, 
        correoElectronico: 'paula.v@gmail.com', 
        telefono: undefined, 
        password: 'paula456' 
    },
    {   
        id: '17', 
        cliente: getRandomCliente(),
        nombre: 'Tomás', 
        apellido: 'Herrera', 
        dni: 25123456, 
        correoElectronico: undefined, 
        telefono: 1123450987, 
        password: 'tomasH12' 
    },
    {   
        id: '18', 
        cliente: getRandomCliente(),
        nombre: 'Camila', 
        apellido: 'Molina', 
        dni: 43198765, 
        correoElectronico: 'camila.m@hotmail.com', 
        telefono: 1167890123, 
        password: undefined 
    },
    {   
        id: '19', 
        cliente: getRandomCliente(),
        nombre: 'Santiago', 
        apellido: 'Rojas', 
        dni: 37123456, 
        correoElectronico: 'santiago.r@yahoo.com', 
        telefono: 1189012345, 
        password: 'santiR' 
    },
    {   
        id: '20', 
        cliente: getRandomCliente(),
        nombre: 'Florencia', 
        apellido: 'Silva', 
        dni: undefined, 
        correoElectronico: 'flor.s@gmail.com', 
        telefono: 1132109876, 
        password: 'flor123' 
    },
    {   
        id: '21', 
        cliente: getRandomCliente(),
        nombre: 'Matías', 
        apellido: 'Núñez', 
        dni: 33165498, 
        correoElectronico: undefined, 
        telefono: 1171234567, 
        password: 'matiasN' 
    },
    {   
        id: '22', 
        cliente: getRandomCliente(),
        nombre: 'Agustina', 
        apellido: 'Ríos', 
        dni: 28123456, 
        correoElectronico: 'agustina.r@outlook.com', 
        telefono: undefined, 
        password: 'agustina' 
    },
    {   
        id: '23', 
        cliente: getRandomCliente(),
        nombre: 'Gonzalo', 
        apellido: 'Paz', 
        dni: 41198765, 
        correoElectronico: 'gonzalo.p@gmail.com', 
        telefono: 1154321098, 
        password: 'gonzaP' 
    },
    {   
        id: '24', 
        cliente: getRandomCliente(),
        nombre: 'Rocío', 
        apellido: 'Luna', 
        dni: 24123456, 
        correoElectronico: undefined, 
        telefono: 1123459876, 
        password: undefined 
    },
    {   
        id: '25', 
        cliente: getRandomCliente(),
        nombre: 'Emiliano', 
        apellido: 'Cruz', 
        dni: 39165498, 
        correoElectronico: 'emiliano.c@hotmail.com', 
        telefono: 1198761234, 
        password: 'emiC789' 
    },
    {   
        id: '26', 
        cliente: getRandomCliente(),
        nombre: 'Julieta', 
        apellido: 'Mendoza', 
        dni: 35123456, 
        correoElectronico: 'julieta.m@yahoo.com', 
        telefono: undefined, 
        password: 'juliM' 
    },
    {   
        id: '27', 
        cliente: getRandomCliente(),
        nombre: 'Facundo', 
        apellido: 'Aguilar', 
        dni: 32198765, 
        correoElectronico: undefined, 
        telefono: 1145671234, 
        password: 'facuA12' 
    },
    {   
        id: '28', 
        cliente: getRandomCliente(),
        nombre: 'Victoria', 
        apellido: 'Campos', 
        dni: 27165498, 
        correoElectronico: 'victoria.c@gmail.com', 
        telefono: 1181234567, 
        password: 'vickyC' 
    },
    {   
        id: '29', 
        cliente: getRandomCliente(),
        nombre: 'Lautaro', 
        apellido: 'Ibarra', 
        dni: 44123456, 
        correoElectronico: 'lautaro.i@outlook.com', 
        telefono: 1120981234, 
        password: undefined 
    },
    { 
        id: '30', 
        cliente: getRandomCliente(),
        nombre: 'Martina', 
        apellido: 'Flores', 
        dni: 30198765, 
        correoElectronico: 'martina.f@hotmail.com', 
        telefono: 1165439876, 
        password: 'martinaF'
    }
]