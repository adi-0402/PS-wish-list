// Productos con nombre, precio e imagen
const productos = [
    {nombre: "Pañales", precio: 120, imagen: "assets/diapers.png"},
    {nombre: "Fular", precio: 110, imagen: "assets/wrap.png"},
    {nombre: "Pijama", precio: 90, imagen: "assets/sleep-clothes.png"},
    {nombre: "Bañera", precio: 150, imagen: "assets/bath.png"},
    {nombre: "Toalla", precio: 80, imagen: "assets/towel.png"},
    {nombre: "Medias", precio: 60, imagen: "assets/socks.png"},
    {nombre: "Colcha", precio: 110, imagen: "assets/blanket.png"},
    {nombre: "Cojin", precio: 170, imagen: "assets/pillow.png"},
    {nombre: "Pañalera", precio: 160, imagen: "assets/bag.png"},
    {nombre: "Organizador", precio: 90, imagen: "assets/organizer.png"},
    {nombre: "Platitos", precio: 70, imagen: "assets/feeding.png"},
    {nombre: "Biberones", precio: 90, imagen: "assets/biberon.png"},
    {nombre: "Camara de Video", precio: 300, imagen: "assets/camera.png"},
    {nombre: "Set de Sabanas", precio: 120, imagen: "assets/penguin.png"},
    {nombre: "Espirales", precio: 90, imagen: "assets/juego.png"},
    {nombre: "Peluche de Conejito", precio: 20, imagen: "assets/conejito.png"},
    {nombre: "Toalla de Tiburon", precio: 70, imagen: "assets/pijamas.png"},
    {nombre: "Cambiador de Pañales", precio: 30, imagen: "assets/manta.png"},
    {nombre: "Gimnasio", precio: 130, imagen: "assets/juguete.png"},
    {nombre: "Tachito", precio: 50, imagen: "assets/tachito.png"},
    {nombre: "Lampara Nave Espacial", precio: 70, imagen: "assets/nave.png"},
    {nombre: "Oso Panda", precio: 30, imagen: "assets/oso.png"},
    {nombre: "Baberos", precio: 30, imagen: "assets/mantita.png"},
];

// Mostrar el contenido principal
const videoSection = document.getElementById('video-section');
const mainContent = document.getElementById('main-content');

// Contenedor donde se agregarán los productos dinámicamente
const itemsContainer = document.querySelector('.items');
const giftInput = document.getElementById('gift-amount');
const totalDisplay = document.getElementById('total');

// Generar los productos dinámicamente
productos.forEach(producto => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    // Generamos el HTML para cada producto
    itemDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="item-image">
        <label>
        <div>${producto.nombre}</div>
        <input type="checkbox" data-price="${producto.precio}">
        <div class="price">${producto.precio} PEN</div>
        </label>
    `;

    // Añadimos cada producto al contenedor
    itemsContainer.appendChild(itemDiv);
});

itemsContainer.addEventListener('change', () => {
    let total = 0;
    const checkboxes = itemsContainer.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(box => {
        if (box.checked) {
            total += parseInt(box.getAttribute('data-price'));
        }
    });

    const giftAmount = parseInt(giftInput.value) || 0;
    total += giftAmount;

    totalDisplay.innerText = total;
});

// Escuchar cambios en el input de gift para recalcular el total
giftInput.addEventListener('input', () => {
    let total = 0;
    const checkboxes = itemsContainer.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(box => {
        if (box.checked) {
            total += parseInt(box.getAttribute('data-price'));
        }
    });

    const giftAmount = parseInt(giftInput.value) || 0;
    total += giftAmount;

    totalDisplay.innerText = total;
});



