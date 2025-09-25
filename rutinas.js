let clientes=[];
let rutina=[];

const botonAsignar = document.querySelector('.button_asignar_rutinas');
const botonVolver = document.getElementById('botonVolverRutina');
const seccionAsignar = document.getElementById('asignar_rutina');
const listadoRutinas = document.getElementById('listado_rutinas');

botonAsignar.addEventListener('click', () => {
    listadoRutinas.style.display = 'none';
    seccionAsignar.style.display = 'block';
    cargarDatos();
});
botonVolver.addEventListener('click', () => {
    seccionAsignar.style.display = 'none';
    listadoRutinas.style.display = 'block';
});

async function mostrarRutinas(filtro="") {
    try{
        const res = await fetch('http://localhost:3007/rutinas');
        let rutinas = await res.json();
        if (filtro){
            rutinas = rutinas.filter(r => r.nivel.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()));
        }
        const tbody = document.getElementById("contenido_tabla_rutinas");
        tbody.innerHTML="";

        rutinas.forEach(r => {
            const fila = document.createElement("tr");
            fila.innerHTML=`<td>${r.id}</td>
                            <td>${r.nombre}</td>
                            <td>${r.nivel}</td>
                            <td>${r.descripcion}</td>
                            <td><button onclick="ObtenerEjercicios(${r.id})">Ver ejercicios</button></td>`;
                            tbody.appendChild(fila);
            
            const filaEjer = document.createElement("tr");
            filaEjer.id = `ejercicios-${r.id}`;
            filaEjer.style.display = "none";
            const celda = document.createElement("td");
            celda.colSpan=5;
            celda.innerHTML = `<ul>${r.ejercicios.map(e=>`<li>${e.nombre} (${e.repeticiones}) [${e.tipo}]</li>`).join("")}</ul>`;
            filaEjer.appendChild(celda);
            tbody.appendChild(filaEjer);
        });
    }catch{
        alert("Error al mostrar rutinas!!");
    }
}

function ObtenerEjercicios(id){
    const fila = document.getElementById(`ejercicios-${id}`);
    fila.style.display=fila.style.display === "none"? "table-row" : "none";
}

document.getElementById("filtroRutina").addEventListener("input", (e)=>{
    mostrarRutinas(e.target.value);
});

async function cargarDatos() {
    try{
        const resClientes = await fetch('http://localhost:3007/clientes');
        clientes=await resClientes.json();
        const selectCliente = document.getElementById('selectCliente');
        clientes.forEach(c=>{
            const option = document.createElement('option');
            option.value = c.id;
            option.textContent = `${c.nombre} ${c.apellido}`;
            selectCliente.appendChild(option);
            });
        
        const resRutinas = await fetch('http://localhost:3007/rutinas');
        rutina = await resRutinas.json();
        const selectRutina = document.getElementById('selectRutina');
        rutina.forEach(r=>{
            const option = document.createElement('option');
            option.value = r.id;
            option.textContent = `${r.nombre} ${r.nivel}`;
            selectRutina.appendChild(option);
        });
        actualizarTablaClientes();
    }catch{
        alert("Error al cargar cliente o rutinas");
        }
}

document.getElementById('form_asignar').addEventListener('submit', async(e)=>{
    e.preventDefault();
    const idCli = document.getElementById('selectCliente').value;
    const idRut = document.getElementById('selectRutina').value;

    if(!idCli || !idRut){
        alert("Seleccione cliente y rutina");
        return;
    }

    try{
        const res = await fetch(`http://localhost:3007/clientes/${idCli}/rutina`,{
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idRutina: idRut})
        });
        const data = await res.json();
        document.getElementById('mensajeRespuesta').textContent =data.mensaje;

        const cliente = clientes.find(c=>c.id == idCli);
        cliente.rutinaId = idRut;
        actualizarTablaClientes();
    }catch{
        alert("Error al asignar rutina");
    }
});

function actualizarTablaClientes(){
    const tbody = document.getElementById('contenido_tablaClientesRutina');
    tbody.innerHTML="";
    clientes.forEach(c=>{
        const fila = document.createElement('tr');
        const ruti= rutina.find(r => r.id == c.rutinaId);
        fila.innerHTML=`<td>${c.id}</td>
                        <td>${c.nombre} ${c.apellido}</td>
                        <td>${rutina ? rutina.nombre: ''}</td>`;
        tbody.appendChild(fila);
    });
}
mostrarRutinas();

