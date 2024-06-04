document.addEventListener("DOMContentLoaded", () => {
    // Definir productos Nike disponibles
    const productosDisponibles = [
        { id: 1, nombre: "Nike Air Force 1 Low LV8 Size 9", precio: 180.00, imagen: "https://images.footlocker.com/is/image/EBFL2/D2522001?wid=250&hei=250&fmt=png-alpha" },
        { id: 2, nombre: "Nike Air Vapormax Plus Size 8", precio: 210.00, imagen: "https://images.footlocker.com/is/image/EBFL2/24453103?wid=250&hei=250&fmt=png-alpha" },
        { id: 3, nombre: "Nike Air Force Size 7.5", precio: 110.00, imagen: "https://images.footlocker.com/is/image/EBFL2/H5178300?wid=250&hei=250&fmt=png-alpha" },
        { id: 4, nombre: "Nike Dunk Low Retro Size 8", precio: 100.00, imagen: "https://images.footlocker.com/is/image/EBFL2/F4188001?wid=250&hei=250&fmt=png-alpha" },
        { id: 5, nombre: "Nike Zoom Vomero 5 Size 10", precio: 130.00, imagen: "https://images.footlocker.com/is/image/EBFL2/F0731007?wid=250&hei=250&fmt=png-alpha" },
        { id: 6, nombre: "Nike Air Max Plus Size 9", precio: 140.00, imagen: "https://images.footlocker.com/is/image/EBFL2/04133139?wid=250&hei=250&fmt=png-alpha" },
        { id: 7, nombre: "Nike Air Max DN Size 7", precio: 150.00, imagen: "https://images.footlocker.com/is/image/EBFL2/V3337004?wid=250&hei=250&fmt=png-alpha" },
        { id: 8, nombre: "Nike Air Max Plus OG Size 8", precio: 160.00, imagen: "https://images.footlocker.com/is/image/EBFL2/X0755500?wid=250&hei=250&fmt=png-alpha" },
        { id: 9, nombre: "Nike Ja Morant One Size 9", precio: 80.00, imagen: "https://images.footlocker.com/is/image/EBFL2/D6565300?wid=250&hei=250&fmt=png-alpha" },
        { id: 10, nombre: "Nike Dunk Low MT Size 8.5", precio: 170.00, imagen: "https://images.footlocker.com/is/image/EBFL2/Z3534100?wid=250&hei=250&fmt=png-alpha" }
    ];

    // Referencias a elementos del DOM
    const productosDiv = document.getElementById("productos");
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    // Referencias para el modal
    const productoModal = new bootstrap.Modal(document.getElementById('productoModal'));
    const modalImagen = document.getElementById("modalImagen");
    const modalNombre = document.getElementById("modalNombre");
    const modalPrecio = document.getElementById("modalPrecio");

    // Cargar carrito almacenado en localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar productos disponibles
    const renderizarProductos = () => {
        productosDisponibles.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.className = "col producto";
            divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precioProducto">Precio: $${producto.precio.toFixed(2)}</p>
                <button data-id="${producto.id}" class="botonVerProducto btn btn-info">Ver Producto</button>
                <button data-id="${producto.id}" class="bottonAgregarCarrito btn btn-primary">Agregar al Carrito</button>
            `;
            productosDiv.appendChild(divProducto);
        });
    };

    // Función para renderizar carrito
    const renderizarCarrito = () => {
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach((item, indice) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                ${item.nombre} - $${item.precio.toFixed(2)}
                <button class="botonEliminar btn btn-danger btn-sm" data-indice="${indice}">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
            total += item.precio;
        });
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    };

    // Función para guardar carrito en localStorage
    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    // Evento para añadir productos al carrito
    productosDiv.addEventListener("click", (event) => {
        if (event.target.classList.contains("bottonAgregarCarrito")) {
            const idProducto = parseInt(event.target.getAttribute("data-id"));
            const productoSeleccionado = productosDisponibles.find(producto => producto.id === idProducto);
            carrito.push(productoSeleccionado);
            guardarCarrito();
            renderizarCarrito();
        }
    });

    // Evento para ver productos
    productosDiv.addEventListener("click", (event) => {
        if (event.target.classList.contains("botonVerProducto")) {
            const idProducto = parseInt(event.target.getAttribute("data-id"));
            const productoSeleccionado = productosDisponibles.find(producto => producto.id === idProducto);
            mostrarProductoEnModal(productoSeleccionado);
        }
    });

    // Evento para eliminar productos del carrito
    listaCarrito.addEventListener("click", (event) => {
        if (event.target.classList.contains("botonEliminar")) {
            const indice = parseInt(event.target.getAttribute("data-indice"));
            carrito.splice(indice, 1);
            guardarCarrito();
            renderizarCarrito();
        }
    });

    // Función para mostrar producto en el modal
    const mostrarProductoEnModal = (producto) => {
        modalImagen.src = producto.imagen;
        modalNombre.textContent = producto.nombre;
        modalPrecio.textContent = `Precio: $${producto.precio.toFixed(2)}`;
        productoModal.show();
    };

    // Renderizar productos y carrito al cargar la página
    renderizarProductos();
    renderizarCarrito();
});