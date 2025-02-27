dejar productosEnCarrito = localStorage.getItem("productos-en-carrito"); 
productosEnCarrito = JSON.parse(productosEnCarrito); 

const contenedorCarritoVacio = document.querySelector("#carrito-vacio"); 
const contenedorCarritoProductos = document.querySelector("#carrito-productos"); 
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones"); 
const contenedorCarritoComprado = document.querySelector("#carrito-comprado"); 
dejar botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); 
const botonVaciar = document.querySelector("#carrito-acciones-vaciar"); 
const contenedorTotal = document.querySelector("#total"); 
const botonComprar = document.querySelector("#carrito-acciones-comprar"); 


función cargarProductosCarrito() { 
    if (productosEnCarrito && productosEnCarrito.length > 0) { 

        contenedorCarritoVacio.classList.add("deshabilitado"); 
        contenedorCarritoProductos.classList.remove("deshabilitado"); 
        contenedorCarritoAcciones.classList.remove("deshabilitado"); 
        contenedorCarritoComprado .classList.add("deshabilitado"); 
    
        contenedorCarritoProductos.innerHTML = ""; 
    
        productosEnCarrito.forEach(producto => { 
    
            const div = document.createElement("div"); 
            div.classList.add("carrito-producto"); 
            div.innerHTML = ` 
                <img class="carrito-producto-imagen" src ="${producto.imagen}" alt="${producto.titulo}"> 
                <div class="carrito-producto-titulo"> 
                    <small>Título</small> 
                    <h3>${producto.titulo}< /h3> 
                </div> 
                <div class="carrito-producto-cantidad"> 
                    <small>Cantidad</small> 
                    <p>${producto.cantidad}</p> 
                </div> 
                <div class="carrito -producto-precio"> 
                    <small>Precio</small> 
                    <p>$${producto.precio}</p> 
                </div> 
                <div class="carrito-producto-subtotal"> 
                    <small>Subtotal</ pequeño> 
                    <p>$${producto.precio * producto.cantidad}</p> 
                </div> 
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i>< /botón> 
            `; 
    
            contenedorCarritoProductos.append(div); 
        }) 
    
    actualizarBotonesEliminar(); 
    actualizarTotal(); 
	
    } demás {
        contenedorCarritoVacio.classList.remove("disabled"); 
        contenedorCarritoProductos.classList.add("disabled"); 
        contenedorCarritoAcciones.classList.add("disabled"); 
        contenedorCarritoComprado.classList.add("disabled"); 
    } 

} 

cargarProductosCarrito(); 

function actualizarBotonesEliminar() { 
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); 

    botonesEliminar.forEach(boton => { 
        boton.addEventListener("click", eliminarDelCarrito); 
    }); 
} 

function eliminarDelCarrito(e) { 
    Toastify({ 
        text: "Producto eliminado", 
        duración: 3000, 
        close: true, 
        gravedad: "top", // `top` o `bottom` 
        posición: "right", // `left `, `center` o `right` 
        stopOnFocus: true, // Evita que se descarte el brindis al pasar el cursor sobre 
        el estilo: { 
          background: "linear-gradient(to right, #4b33a8, #785ce9)", 
          borderRadius: "2rem", 
          textTransform: "uppercase", 
          fontSize: ".75rem" 
        }, 
        offset: { 
            x: '1.5rem', // eje horizontal - puede ser un número o una cadena que indique la unidad, por ejemplo: '2em' 
            y: '1.5rem' //. eje vertical: puede ser un número o una cadena que indique la unidad, por ejemplo: '2em' 
          }, 
        onClick: function(){} // Devolución de llamada después de hacer clic 
      }).showToast(); 

    const idBoton = e.currentTarget.id; 
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); 
    
    productosEnCarrito.splice(index, 1); 
    Productos cargarCarrito(); 

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); 

} 

botonVacar.addEventListener("clic", vaciarCarrito); 
function vaciarCarrito() { 

    Swal.fire({ 
        title: '¿Estás seguro?', 
        icon: 'question', 
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad , 0)} productos.`, 
        showCancelButton: true, 
        focusConfirm: false, 
        confirmButtonText: 'Sí', 
        cancelButtonText: 'No' 
    }).then((resultado) => { 
        if (result.isConfirmed) { 
            productosEnCarrito.length = 0 ; 
            almacenamiento local.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); 
            Productos cargarCarrito(); 
        } 
      }) 
}


función actualizarTotal() { 
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); 
    total.innerText = `$${totalCalculado}`; 
} 

botonComprar.addEventListener("click", comprarCarrito); 
función comprarCarrito() { 

    productosEnCarrito.length = 0; 
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); 
    
    contenedorCarritoVacio.classList.add("deshabilitado"); 
    contenedorCarritoProductos.classList.add("deshabilitado"); 
    contenedorCarritoAcciones.classList.add("deshabilitado"); 
    contenedorCarritoComprado.classList.remove("deshabilitado"); 

}
