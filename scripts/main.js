document.addEventListener("DOMContentLoaded", () => {
  // Definir productos Nike disponibles
  const productosDisponibles = [
    {
      id: 1,
      nombre: "Nike Air Force 1 Low LV8",
      size: 9,
      precio: 180.0,
      imagen:
        "https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/c09cf8bc-4d6c-4564-86d6-cc172deab92e/tenis-dunk-low-ppQwKZ.png",
    },
    {
      id: 2,
      nombre: "Nike Air Vapormax Plus",
      size: 8,
      precio: 210.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5bf444c9-5e5b-4bd7-a2fa-c6f866a87c3c/tenis-air-vapormax-plus-nC0dzF.png",
    },
    {
      id: 3,
      nombre: "Nike Air Force Size",
      size: 7.5,
      precio: 110.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/80c378b7-3fb0-44c5-baff-242b58fb647b/calzado-air-force-1-07-f3wwrM.png",
    },
    {
      id: 4,
      nombre: "Nike Dunk Low Retro",
      size: 8,
      precio: 100.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ff7d3982-fcd3-471a-b869-2d14da2a2474/calzado-dunk-low-retro-1xlGBR.png",
    },
    {
      id: 5,
      nombre: "Nike Zoom Vomero 5",
      size: 10,
      precio: 130.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bcf33877-4336-42cc-8eb1-d88413eefd10/tenis-zoom-vomero-5-81TPKW.png",
    },
    {
      id: 6,
      nombre: "Nike Air Max Plus",
      size: 9,
      precio: 140.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54c1ac66-1f91-4046-aab8-aa6dc388888d/calzado-air-max-plus-3mH52P.png",
    },
    {
      id: 7,
      nombre: "Nike Air Max DN7",
      size: 7,
      precio: 150.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bc05f48c-e73c-4bb2-bdac-9ad88e9ddd0a/tenis-air-max-dn-27XkSQ.png",
    },
    {
      id: 8,
      nombre: "Nike Air Max Plus OG",
      size: 8,
      precio: 160.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a75b1017-1081-42d3-b040-ed10ed2695bc/tenis-air-vapormax-plus-chicago-nC0dzF.png",
    },
    {
      id: 9,
      nombre: "Nike V2k Run",
      size: 9,
      precio: 80.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3e8455ad-c00c-4996-a85a-b5c4d38c6ae2/tenis-v2k-run-ZKMJLX.png",
    },
    {
      id: 10,
      nombre: "Nike Dunk Low MT5",
      size: 8.5,
      precio: 170.0,
      imagen:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f8b0d10-a51f-4c40-b5de-953012998b19/calzado-dunk-low-JMkfpg.png",
    },
  ];

  // Referencias a elementos del DOM
  const productosDiv = document.getElementById("productos");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarrito = document.getElementById("totalCarrito");

  // Referencias para el modal
  const productoModal = new bootstrap.Modal(
    document.getElementById("productoModal")
  );
  const modalImagen = document.getElementById("modalImagen");
  const modalNombre = document.getElementById("modalNombre");
  const modalSize = document.getElementById("modalSize");
  const modalPrecio = document.getElementById("modalPrecio");

  // Cargar carrito almacenado en localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para renderizar productos disponibles
  const renderizarProductos = () => {
    productosDisponibles.forEach((producto) => {
      const divProducto = document.createElement("div");
      divProducto.className = "col-6 col-sm-3 productoCard";
      divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3 class="nombreProducto">${producto.nombre}</h3>
        <p class="parrafoSize"> Size: ${producto.size}</p>
        <p class="precioProducto">Precio: $${producto.precio.toFixed(2)}</p>
        <button data-id="${producto.id}" class="botonVerProducto">Ver Producto</button>
        <button data-id="${producto.id}" class="bottonAgregarCarrito" id="bottonAgregar">Agregar al Carrito</button>
      `;
      productosDiv.appendChild(divProducto);
    });
  
    // Agregar eventos a los botones "Agregar al Carrito"
    let botonesAgregar = document.querySelectorAll(".bottonAgregarCarrito");
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Agregando al Carrito",
          className: "swal2-icon swal2-success swal2-animate-success-icon"
        });
      });
    });
  };

  // Función para renderizar carrito
  const renderizarCarrito = () => {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((item, indice) => {
      const li = document.createElement("li");
      li.className =
        "lista d-flex justify-content-between align-items-center";
      li.innerHTML = `
                ${item.nombre} - $${item.precio.toFixed(2)}
                <button class="botonEliminar btn btn-danger btn-sm" data-indice="${indice}">Eliminar</button>
            `;
      listaCarrito.appendChild(li);
      total += item.precio;
    });
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    let pagarProducto = document.getElementById("pagarProducto");
    pagarProducto.textContent = `Pagar $${total}`;
    if (total === 0) {
      pagarProducto.textContent = "Pagar"; 
      pagarProducto.addEventListener("click", () => {
        Swal.fire({
          icon: "error",
          title: "No Tienes Productos en el Carrito",
          text: "Debes Agregar Almenos Un Producto a tu Carrito de Compras! ",
          confirmButtonColor: "#2A3439",
          confirmButtonBorderColor: "#E5E4E2",
          confirmButtonText: " Ver Productos",
        });
      })
    }else {
        pagarProducto.textContent = `Pagar $${total}`;
      
      pagarProducto.addEventListener("click", () => {
        Swal.fire({
          title: "Pagar Productos",
          text: `El total a pagar es de $${total} ¿Desea realizar el pago?`,
          imageUrl: "https://incredibletravelperu.com/wp-content/uploads/2020/04/Metodos-de-pago-incredible-peru-travel.png",
          imageWidth: 300,
          imageHeight: 100,
          imageAlt: "Custom image",
          showCancelButton: true,
          confirmButtonColor: "#2A3439",
          confirmButtonBorderColor: "#E5E4E2",
          confirmButtonColorText: "#2A3439",
          confirmButtonText: `<a href="../pages/pagos.html">Ir a Pagar</a>`,
        });
      })
    }
  };

  // Función para guardar carrito en localStorage
  const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  // Evento para añadir productos al carrito
  productosDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("bottonAgregarCarrito")) {
      const idProducto = parseInt(event.target.getAttribute("data-id"));
      const productoSeleccionado = productosDisponibles.find(
        (producto) => producto.id === idProducto
      );
      carrito.push(productoSeleccionado);
      guardarCarrito();
      renderizarCarrito();
    }
  });

  // Evento para ver productos
  productosDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("botonVerProducto")) {
      const idProducto = parseInt(event.target.getAttribute("data-id"));
      const productoSeleccionado = productosDisponibles.find(
        (producto) => producto.id === idProducto
      );
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
    modalSize.textContent = `Size: ${producto.size}`;
    modalPrecio.textContent = `Precio: $${producto.precio.toFixed(2)}`;
    productoModal.show();
  };

  // Renderizar productos y carrito al cargar la página
  renderizarProductos();
  renderizarCarrito();
});
