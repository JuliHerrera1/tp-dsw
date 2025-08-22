let clientes = [
    {id: 1, nombre: "Julieta", apellido: "Herrera", fecha:"2005-09-05", telefono:"3411234567", email:"juliherrera@gmail.com"},
    {id: 2, nombre: "Lucia", apellido: "Crosetti", fecha:"2004-11-13", telefono:"3414561234", email:"lucrosetti@gmail.com"}
];

// Función para ir mostrando solo de a una sección
function mostrarSeccion(id) {
    const secciones = ["menu_gestion_cliente", "form_cliente", "form_modificar_cliente", "listado_clientes"];
    secciones.forEach(sec => document.getElementById(sec).style.display = "none");
    document.getElementById(id).style.display = "block";
    mostrarClientes();
}

// CREAR AL CLI
document.getElementById("crearFormulario").addEventListener("submit", function(e){
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fecha = document.getElementById("fecha").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("tel").value;

    if(!nombre || !apellido){
        alert("Los campos no pueden estar vacios o ser espacios en blanco. Vuelva a intentarlo! ");
        return;
    }
    if (isNaN(telefono)){
        alert("El numero de telefono solo debe contener digitos. Vuelva a intentarlo! ");
        return;
    }
    if (!email.includes("@") || !email.includes(".")){
        alert("No se esta cumpliendo con la estructura del email: ejemplo@gmail.com. Vuelva a intentarlo!")
        return;
    }
    const fechaVal = new Date(fecha);    //los valores de los inputs son string
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaVal.getFullYear();
    if (edad < 11){
        alert ("No se permite ingreso a personas menordes de 11 años. ");
        return;
    }
    if(fechaVal > hoy){
        alert("La fecha ingresada no es valida. Intente nuevamente!");
        return;
    }

    const confirmar = confirm(`Confirmar la creacion del cliente: ${nombre}, ${apellido} ?`);
    if (confirmar){
    const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    clientes.push({id: nuevoId, nombre, apellido, fecha, email, telefono});

    alert("Se creo al cliente correctamente!!! ");
    mostrarSeccion("listado_clientes");
    mostrarClientes();
    } else{ alert (`No se pudo crear al cliente! `);}
    
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("fecha").value="";
    document.getElementById("email").value="";
    document.getElementById("tel").value="";
});

// MOSTRAR A LOS CLI
function mostrarClientes(filtro = "") {
    const tbody = document.getElementById("contenido_tabla_clientes");
    tbody.innerHTML="";
    const cliFiltrados = filtro === "" ? clientes : clientes.filter(c => c.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()));

    cliFiltrados.forEach(c => {
        const fila = document.createElement("TR");
        fila.innerHTML=`<td>${c.id}</td>
                        <td>${c.nombre}</td>
                        <td>${c.apellido}</td>
                        <td>${c.fecha}</td>
                        <td>${c.telefono}</td>
                        <td>${c.email}</td>
                        <td> <button onclick="modificacionesCliente(${c.id})">Actualizar</button>
                        <button onclick="borrarCliente(${c.id})">Eliminar</button>
                        </td>`;
                        tbody.appendChild(fila);
    });
}

// BORRAR A ALGUN CLI
function borrarCliente(id) {
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return alert(`No se encontró al cliente de id:  ${id}`);
    const confirmar = confirm (`¿Esta seguro que desea eliminar al cliente de id: ${id}?`);
    if (confirmar) {clientes.splice(index, 1);
    alert(`El cliente de id: ${id} fué eliminado correctamente!`);
    mostrarClientes();
    } else {alert(`Se cancelo la eliminacion del cliente: ${id}`);}
}

// MODIFICAR ALGUN CLI
function modificacionesCliente(id) {
    const cli = clientes.find(c => c.id === id);
    if (!cli) return alert(`No se encontró al cliente de id:  ${id}`);
    mostrarSeccion("form_modificar_cliente");

    // Rellenamos el formulario c datos actuales para q sepa el admin que tiene que cambiar
    document.getElementById("editarNombre").value = cli.nombre;
    document.getElementById("editarApellido").value = cli.apellido;
    document.getElementById("editarFecha").value = cli.fecha;
    document.getElementById("editarEmail").value = cli.email;
    document.getElementById("editarTelefono").value = cli.telefono;

    // Guardamos los cambios q hizo el admin
    document.getElementById("editarFormulario").onsubmit = function(e){
        e.preventDefault();
        cli.nombre = document.getElementById("editarNombre").value || cli.nombre;
        cli.apellido = document.getElementById("editarApellido").value || cli.apellido;
        cli.fecha = document.getElementById("editarFecha").value || cli.fecha;
        cli.email = document.getElementById("editarEmail").value || cli.email;
        cli.telefono = document.getElementById("editarTelefono").value || cli.telefono;
        alert(` Cliente: ${cli.nombre} actualizado correctamente!`);
        mostrarSeccion("listado_clientes");
        mostrarClientes();
    }

    // Si el admin cancela la modificacion de los datos volvemos
    document.getElementById("cancelarModificaciones").onclick = function() {
        mostrarSeccion("menu_gestion_cliente");
    }
}

document.getElementById("filtroNombre").addEventListener("input", function(){
    const filtro = this.value;
    mostrarClientes(filtro);
});



//MOTRAMOS AK INICIO EL
mostrarSeccion("menu_gestion_cliente");
