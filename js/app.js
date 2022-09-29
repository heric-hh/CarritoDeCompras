// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

// Arreglo con articulos del carrito
let articulosCarrito = [];

cargarEventListener();

//Registrar todos los eventos
function cargarEventListener() {
     //Cuando agregas un curso presionando "Agregar al carrito"
     listaCursos.addEventListener('click', agregarCurso);
}

//Funciones
function agregarCurso(e) {
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')) {
          const cursoSeleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(cursoSeleccionado)
     }
}

//Lee el contenido del HTML 
function leerDatosCurso(curso) {
     console.log(curso);

     //Crear un objeto con el contenido del curso actual
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }

     //Agrega elementos al arreglo de carrito
     articulosCarrito = [...articulosCarrito, infoCurso];

     console.log(articulosCarrito)

     carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
     //Limpiar el HTML
     limpiarHTML();

     //Recorre el carrito y genera el HTML
     articulosCarrito.forEach( curso => {
          const { imagen, titulo , precio, cantidad, id} = curso;
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>
               <img src="${curso.imagen}" width="100"> 
               <td> ${titulo} </td>
               <td> ${precio} </td>
               <td> ${cantidad} </td>
               <td> 
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
               </td>

          `;

          //Agrega el HTML del carrito en el body
          contenedorCarrito.appendChild(row);
     })
};

function limpiarHTML() {
     //Forma Lenta
     // contenedorCarrito.innerHTML = '';
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}