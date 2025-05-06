const express = require('express'); //import the express module
const app = express(); //create an Express application
const PORT = 3000; // port defined

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTS
/*const bodyParser = require('body-parser');
app.use(bodyParser.json());
const userRoutes = require('./routes/users.js');
app.use('/users', userRoutes);
console.log('userRoutes',userRoutes);*/

// Database
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// (C)RUD | CREATE = POST
app.post('/users', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});
// C(R)UD | READ = GET
app.get('/', (req, res) => res.send(`
    <h1>HOMEPAGE</h1>
    <a href="/users">usuarios</a>
    <a href="/newUser">nuevo usuario</a>
    `)
);
app.get('/users', (req, res) => {
    res.send(`
    <h1>Lista de usuarios</h1>
    <ul>
    ${usuarios
      .map((usuario) => `<li> ID:${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Procedencia: ${usuario.lugarProcedencia} </li>`)
      .join('')}
    </ul>
    `);
});
app.get('/newUser', (req, res) => res.send(`
    <h1>NEWUSER</h1>
    <form action="/users" method="post"> 
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required>
        <label for="edad">Edad</label>
        <input type="text" id="edad" name="edad" required>
        <label for="lugarProcedencia">lugarProcedencia</label>
        <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
        <button type="submit">Agregar usuario</button>
    </form>
    `)
);
// CR(U)D | UPDATE = PUT
// CRU(D) | DELETE = DELETE


// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));