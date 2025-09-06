const express = require('express');
const app = express();
const PORT = 3007;

app.use(express.json());
app.use(express.static('frontend'));

let clientes = [];
let idCli = 1;

// GET clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// POST crear cliente
app.post('/clientes', (req, res) => {
    const nuevoCli = { id: idCli++, ...req.body };
    clientes.push(nuevoCli);
    res.status(201).json({ mensaje: 'Cliente agregado correctamente!' });
});

// PUT modificar cliente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pos = clientes.findIndex(c => c.id === id);
    if (pos === -1) return res.status(404).json({ mensaje: 'Cliente no encontrado!' });
    clientes[pos] = { ...clientes[pos], ...req.body };
    res.json({ mensaje: 'Cliente actualizado correctamente!' });
});

// DELETE cliente
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    clientes = clientes.filter(c => c.id !== id);
    res.json({ mensaje: 'Cliente eliminado correctamente!' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

let turnos=[];
let idTur = 1;

app.get('/turnos',(req,res)=>{
    res.json(turnos);
});

app.post('/turnos', (req,res)=>{
    const nuevoTur = {id: idTur++, ...req.body};
    turnos.push(nuevoTur);
    res.status(201).json({mensaje:'Se ha creado su turno correctamente!!'});
});

app.put('/turnos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const posTur = turnos.findIndex(t => t.id === id);
    if (posTur === -1)  return res.status(404).json({mensaje: 'No se encontró el turno ingresado!!'});
    turnos[posTur]={...turnos[posTur], ...req.body};
    res.json({mensaje: 'El turno se ha actualizado correctamente!! '});
});

app.delete('/turnos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    turnos = turnos.filter(t => t.id !== id);
    res.json({mensaje:'El turno ha sido eliminado correctamente', turnos: turnos});
});