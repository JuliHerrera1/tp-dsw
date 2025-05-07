# Grupo  
## Integrantes  
53264 \- Crosetti, Lucía  
53486 \- Herrera, Julieta Carolina

## Repositorios

* [frontend]()  
* [backend]()

# Tema  
## Descripción  
Gimnasio **TurnoFit**: esta aplicación busca mejorar la experiencia del cliente con nuestro gimnasio, permitiéndole gestionar por su cuenta cualquier tipo de actividades relacionadas con el servicio brindado, tales como inscribirse a charlas con especialistas, reservar turnos diarios o abonar sus cuotas mensuales. La aplicación cuenta con tres usuarios: Cliente, Entrenador y Administrador. 

## Modelo  
[Modelo de dominio](https://drive.google.com/file/d/1Wa9tm4JVtbpTqE7pUHRLNCeK8GW3ujhl/view?usp=sharing)

# Alcance funcional

## Alcance Mínimo

Regularidad

| Requerimientos | Detalles |
| ----- | :---- |
| CRUD simple | 1.CRUD Administrador 2.CRUD Entrenador 3.CRUD Cliente |
| Dependiente de CRUD | 1.CRUD Ejercicio {depende de} CRUD Rutina 2.CRUD Cupo {depende de} CRUD Turno |
| Listado \+ detalles | Listado de Ejercicios filtrado por atributo tipoEjercicio \=\> muestra ejercicios de ese tipo |
| CUU | 1.Crear Rutina 2.Registrar Cliente |

Adicionales para aprobación

| Requerimientos | Detalles |
| ----- | :---- |
| CRUD simple | 1.CRUD Turno 2.CRUD Rutina |
| CRUD dependiente | 1.CRUD Cuota {depende de} CRUD Cliente |
| CUU | 1.Ingreso del Cliente 2.Ver estado de la cuota |

## Alcance Adicional Voluntario

| Requerimientos | Detalles |
| ----- | :---- |
| CUU/ Epics | 1.Gestión de turnos 2.Gestión de pagos |

