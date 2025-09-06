let turnoEdicion =null;

function mostrarSeccion(id) {
    const secciones = ["menu_gestion_turnos", "form_turnos", "listado_turnos"];
    secciones.forEach(sec => {
        const el = document.getElementById(sec);
        if(el) el.style.display = "none";
    });
    const seccion = document.getElementById(id);
    if(seccion) seccion.style.display = "block";
    else console.error(`No se encontró la sección con id="${id}"`);
    if(id === "listado_turnos"){
        mostrarTurnos();
    }
}

document.getElementById("crearTurno").addEventListener("submit", async function(e){
    e.preventDefault();
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const cupos = parseInt(document.getElementById("cupos").value);

    if(!dia || !hora || isNaN(cupos) || cupos <= 0){
        alert("Complete correctamente todos los campos!!");
        return;
    }

    const nuevoTurno = { dia, hora, cupos };
    try{
        let res, mensaje;
        if(turnoEdicion){
            res = await fetch(`http://localhost:3007/turnos/${turnoEdicion.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoTurno)
        });
        mensaje = "El turno se ha actualizado correctamente!!";
        turnoEdicion=null;
        }else{
            res = await fetch('http://localhost:3007/turnos', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoTurno)
            });
            mensaje = "Se ha creado su turno correctamente!!";
        }
        const data = await res.json();
        alert(data.mensaje);

        document.getElementById("dia").value = "";
        document.getElementById("hora").value = "";
        document.getElementById("cupos").value = "";
        mostrarSeccion("listado_turnos");
        }catch(err){
            alert("Error al crear el turno!!");
            console.error(err);
    }
});


async function mostrarTurnos(filtro="") {
    try{
        const res = await fetch('http://localhost:3007/turnos');
        let turnos = await res.json();
        if(filtro){
        turnos = turnos.filter(t => t.dia && t.dia.includes(filtro));
        }
        const tbody = document.getElementById("contenido_tabla_turnos");
        tbody.innerHTML = "";
        if(turnos.length === 0){
            t.body.innerHTML=`<tr><td colspan="5">No hay turnos disponibles</td></tr>`;
            return;
        }
        turnos.forEach(t => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${t.id}</td>
                <td>${t.dia}</td>
                <td>${t.hora}</td>
                <td>${t.cupos}</td>
                <td>
                    <button class="bot_turno" onclick="modificarTurno(${t.id})">Actualizar</button>
                    <button class="bot_turno" onclick="borrarTurno(${t.id})">Eliminar</button>
                </td>`;
            tbody.appendChild(fila);
        });
    }catch(error){
        alert("Error al obtener los turnos!!");
        console.log(error);
    }
}

async function borrarTurno(id){
    const confirmar = confirm(`¿Está seguro que desea eliminar el turno con ID: ${id}?`);
    if(!confirmar) return;
    try{
        const res = await fetch(`http://localhost:3007/turnos/${id}`, { method: 'DELETE' });
        const data = await res.json();
        alert(data.mensaje);
        mostrarTurnos();
    }catch(error){
        alert("Error al eliminar turno!!");
        console.log(error);
    }
}

async function modificarTurno(id){
    try{
        const res = await fetch('http://localhost:3007/turnos');
        const turnos = await res.json();
        const turno = turnos.find(t => t.id === id);
        if(!turno) return alert(`No se encontró el turno con ID: ${id}`);

        document.getElementById("dia").value = turno.dia;
        document.getElementById("hora").value = turno.hora;
        document.getElementById("cupos").value = turno.cupos;

        turnoEdicion = turno;
        mostrarSeccion("form_turnos");

    }catch(err){
        alert("Error al obtener turnos!!");
        console.error(err);
    }
}


document.getElementById("filtroDia").addEventListener("input", function(){
    mostrarTurnos(this.value);
});

mostrarSeccion("menu_gestion_turnos");