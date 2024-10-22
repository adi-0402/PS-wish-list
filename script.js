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

// Mostrar el contenido principal después del video
const continueBtn = document.getElementById('continue-btn');
const videoSection = document.getElementById('video-section');
const mainContent = document.getElementById('main-content');

continueBtn.addEventListener('click', () => {
    videoSection.style.display = 'none';
    mainContent.style.display = 'block';
});

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

// Enviar mensaje usando la API REST de EmailJS
sendBtn.addEventListener('click', () => {
    const buyerName = document.getElementById('buyer-name').value;
    const message = document.getElementById('custom-message').value;

    if (!buyerName || !message) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const selectedItems = Array.from(itemsContainer.querySelectorAll('input[type="checkbox"]'))
        .filter(box => box.checked)
        .map(box => box.parentElement.textContent.trim());

    const giftAmount = parseInt(giftInput.value) || 0;
    const total = totalDisplay.innerText;

    const emailParams = {
        service_id: 'service_ipajrpn',  // Reemplaza con tu Service ID
        template_id: 'template_z3vjahc', // Reemplaza con tu Template ID
        user_id: '9whPqkgqidvtcME3T',   // Reemplaza con tu Public Key (User ID)
        template_params: {
            buyer_name: buyerName,
            selected_items: selectedItems.join(", "),
            total: total,
            custom_message: message,
            gift_amount: giftAmount
        }
    };

    console.log("Enviando parámetros de correo: ", emailParams);

    // Usar fetch para enviar el correo usando la API REST de EmailJS
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailParams)
    })
    .then(response => {
        if (response.ok) {
            alert('¡Correo enviado exitosamente!');
        } else {
            return response.json().then(error => {
                throw new Error(error.text);
            });
        }
    })
    .catch(error => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo. Revisa los detalles en la consola.');
    });
});



