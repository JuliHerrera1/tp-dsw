const express = require("express");
const cors = require("cors");
const app = express();
puerto = 3000;

app.use(cors());
app.use(express.json());

let clientes = [
    {id: 1, nombre: "Julieta", apellido: "Herrera", fecha:"2005-09-05", telefono:"3411234567", email:"juliherrera@gmail.com"},
    {id: 2, nombre: "Lucia", apellido: "Crosetti", fecha:"2004-11-13", telefono:"3414561234", email:"lucrosetti@gmail.com"}
];

app.get('/clientes',(req,res)=>{
    res.json(clientes);
});

app.post('/clientes', (req, res)=>{
    const nuevoCli = req.body;
    nuevoCli.id = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    clientes.push(nuevoCli);
    res.json({mensaje:'Cliente creado con éxito', cliente: nuevoCli});
})

app.delete('/clientes/:id',(req,res)=>{
    const idCliABorrar = parseInt(req.params.id);
    const posCliABorrar = clientes.findIndex(c => c.id === idCliABorrar);
    if(posCliABorrar === -1){
        res.json({mensaje: `No se encontro al cliente de id: ${idCliABorrar}`});
    }else{
    clientes.splice(posCliABorrar,1);
    res.json({mensaje: `Se eliminó correctamente el cliente de id: ${idCliABorrar}`})
}
})

app.put('/clientes/:id', (req,res)=>{
    const idCliAActualizar = parseInt(req.params.id);
    const posCliAct = clientes.findIndex(c => c.id === idCliAActualizar);
    if (posCliAct === -1){
        res.json({mensaje: `No se encontro al cliente de id: ${idCliAActualizar}`});
    }else{
        clientes[posCliAct]={id: idCliAActualizar, ...req.body};
        res.json({mensaje: `Se actualizó correctamente el cliente de id: ${idCliAActualizar}`, cliente: clientes[posCliAct]});
    }
})

app.listen(puerto, ()=>{
    console.log(`Servidor corriendo en http://localhost: ${puerto}`);
})