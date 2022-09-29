// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

cargarEventListener();

//Registrar todos los eventos
function cargarEventListener() {
     //Cuando agregas un curso presionando "Agregar al carrito"
     listaCursos.addEventListener('click', agregarCurso);
}

//Funciones
function agregarCurso(e) {
     if(e.target.classList.contains('agregar-carrito')) {
          e.preventDefault();
          console.log(e.target);
     }
}