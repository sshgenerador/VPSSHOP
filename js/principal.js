let productos = [];

buscar("./js/productos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        productos = datos;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
dejar botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aparte.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("hacer clic", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("activo"));
        e.currentTarget.classList.add("activo");

        si (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            Producto cargaros(productosBoton);
        } demás {
            tituloPrincipal.innerText = "Todos los productos";
            Producto cargaros(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

deje productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} demás {
    productosEnCarrito = [];
}

función agregarAlCarrito(e) {

    Tostar({
        texto: "Producto agregado",
        duración: 3000,
        cerrar: cierto,
        gravedad: "arriba", // `arriba` o `abajo`
        posición: "derecha", // `izquierda`, `centro` o `derecha`
        stopOnFocus: true, // Evita que se descarte el brindis al pasar el mouse
        estilo: {
          fondo: "gradiente lineal(a la derecha, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "mayúscula",
          Tamaño de fuente: ".75rem"
        },
        compensar: {
            x: '1.5rem', // eje horizontal - puede ser un número o una cadena que indique la unidad, p. ej.: '2em'
            y: '1.5rem' // eje vertical - puede ser un número o una cadena que indique la unidad, p. ej.: '2em'
          },
        onClick: function(){} // Devolución de llamada después del clic
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } demás {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

función actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
