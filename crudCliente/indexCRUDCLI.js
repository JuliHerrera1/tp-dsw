
// Función para ir mostrando solo de a una sección
function mostrarSeccion(id) {
    const secciones = ["menu_gestion_cliente", "form_cliente", "form_modificar_cliente", "listado_clientes"];
    secciones.forEach(sec => document.getElementById(sec).style.display = "none");
    document.getElementById(id).style.display = "block";
    mostrarClientes();
}

// CREAR AL CLI
document.getElementById("crearFormulario").addEventListener("submit", async function(e){
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
    const fechaVal = new Date(fecha);    //pq los valores de los inputs son string
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
    const nuevoCli = {nombre, apellido,fecha, email, telefono};
    try{
        const res = await fetch('http://localhost:3000/clientes',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoCli)
        });
        const data=await res.json();
        alert(data.mensaje);
        mostrarSeccion("listado_clientes");
        mostrarClientes()
    }catch{
        alert("Error al crear el cliente!! ");
    }

    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("fecha").value="";
    document.getElementById("email").value="";
    document.getElementById("tel").value="";
});

// MOSTRAR A LOS CLI
async function mostrarClientes(filtro = "") {
    try{
        const res = await fetch('http://localhost:3000/clientes');
        let clientes = await res.json();
        if (filtro){
        clientes = clientes.filter(c => c.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()));
        }
        const tbody = document.getElementById("contenido_tabla_clientes");
        tbody.innerHTML="";

        clientes.forEach(c => {
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
        }catch{
            alert("Error al obtener clientes!! ");
        }
}

// BORRAR A ALGUN CLI
async function borrarCliente(id) {
    const confirmar = confirm (`¿Esta seguro que desea eliminar al cliente de id: ${id}?`);
    if (!confirmar) return;
    try{
        const res =await fetch(`http://localhost:3000/clientes/${id}`,{
            method: 'DELETE'
        });
        const data = await res.json();
        alert (data.mensaje);
        mostrarClientes();
    }catch{
        alert("Error al borrar cliente!!")
    }
}

// MODIFICAR ALGUN CLI
async function modificacionesCliente(id) {
    let clientes;
    try{
        const res=await fetch('http://localhost:3000/clientes');
        clientes = await res.json();
    }catch{
        alert("Error al obtener los clientes");
    return;
}
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
    document.getElementById("editarFormulario").onsubmit = async function(e){
        e.preventDefault();
        const cliActualizado ={
        nombre: document.getElementById("editarNombre").value || cli.nombre,
        apellido: document.getElementById("editarApellido").value || cli.apellido,
        fecha: document.getElementById("editarFecha").value || cli.fecha,
        email: document.getElementById("editarEmail").value || cli.email,
        telefono: document.getElementById("editarTelefono").value || cli.telefono
        };
    try{
        const res =await fetch(`http://localhost:3000/clientes/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cliActualizado)
        });
        const data = await res.json();
        alert(data.mensaje);
        mostrarSeccion("listado_clientes");
        mostrarClientes();
    }catch{
        alert("Error al actualizar el cliente");
    }
}; 
    // Si el admin cancela la modificacion de los datos volvemos
    document.getElementById("cancelarModificaciones").onclick = function() {
        mostrarSeccion("menu_gestion_cliente");
    };
}

document.getElementById("filtroNombre").addEventListener("input", function(){
    const filtro = this.value;
    mostrarClientes(filtro);
});



//MOTRAMOS AK INICIO EL
mostrarSeccion("menu_gestion_cliente");
