// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

//Funciones
const agregarCurso = (e) => {
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')) {
          const cursoSeleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(cursoSeleccionado)
     }
}

//Lee el contenido del HTML 
const leerDatosCurso = (curso) => {
     console.log(curso);

     //Crear un objeto con el contenido del curso actual
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }

     //Revisa si un elemento ya existe en el carrito
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
     if(existe) {
          //Actualizamos la cantidad
          const cursos = articulosCarrito.map(curso => {
               if(curso.id === infoCurso.id) {
                    curso.cantidad++
                    return curso; //Retorna el objeto actualizado
               } else {
                    return curso; //Retorna los objetos que no son duplicados
               }
          });
          articulosCarrito = [...cursos];
     } else {
          //Agregar elementos al arreglo de carrito
          articulosCarrito = [...articulosCarrito, infoCurso];

     }

     console.log(articulosCarrito)

     carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
}

//Eliminar curso del carrito
const eliminarCurso = (e) => {
     if(e.target.classList.contains('borrar-curso')) {
          const cursoId = e.target.getAttribute('data-id');

          //Elimina del arreglo de articulos carrito por el data-id
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();

          console.log(articulosCarrito);
     }
}

const limpiarHTML = () => {
     //Forma Lenta
     // contenedorCarrito.innerHTML = '';
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

//Muestra el carrito de compras en el HTML
const carritoHTML = () => {
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
     });

     // Agregar el carrito de compras al storage
     sincronizarStorage();
};

const sincronizarStorage = () => {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Registrar todos los eventos
const cargarEventListener = () => {
     //Cuando agregas un curso presionando "Agregar al carrito"
     listaCursos.addEventListener('click', agregarCurso);

     //ELiminar cursos del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Muestra los cursos del local storage
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse(localStorage.getItem('carrito') ) || [];
          carritoHTML();
     });

     //Vaciar Carrito
     vaciarCarritoBtn.addEventListener('click', () => {
          articulosCarrito = []; //Resetear arreglo
          limpiarHTML(); //Eliminar todo el HTML
     })
}

// Arreglo con articulos del carrito
let articulosCarrito = [];

cargarEventListener();









