let carrito = [];
let contenedor = document.getElementById("cartasProductos");

function renderizarProductos(){
    for(const producto of stock){
        contenedor.innerHTML += `
            <div id="carta" class="card col-sm-2">
                <img id="imagencarta" src=${producto.imagen} class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <p class="card-text">- ${producto.tipo} -</p>
                    <button id='btn${producto.id}' class="btn btn-primary">Comprar</button>
                </div>
            </div>   
        `;
    } 

    stock.forEach((producto)=>{
        //evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    });
}

renderizarProductos();

function agregarAlCarrito(productoAComprar){
    carrito.push(productoAComprar);

    document.getElementById("tabla").innerHTML += `
        <tr>
            <td>${productoAComprar.id}</td>
            <td>${productoAComprar.nombre}</td>
            <td>${productoAComprar.precio}</td>
        </tr>
    `;

    let totalCarrito = carrito.reduce((acumulador,prod) => acumulador+prod.precio,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
}

let comprar = document.getElementById("comprar")
comprar.onclick = () => {
    carrito = [0]
    document.getElementById("tabla").innerHTML= "";
    document.getElementById("total").innerText = "Total a pagar $: ";  
}

let cancelar = document.getElementById("cancelar")
cancelar.onclick = () => {
    carrito = [0]
    document.getElementById("tabla").innerHTML= "";
    document.getElementById("total").innerText = "Total a pagar $: ";  
}

let guardar = document.getElementById("guardarcarrito")
guardar.onclick = () => { 
    
    let guardarCarro = (clave, valor) => { localStorage.setItem(clave, valor) };

    guardarCarro("miCarro", JSON.stringify(carrito));

}

let recuperar = document.getElementById("recuperar")
recuperar.onclick = () => { 
    
    class Producto {
        constructor(obj) {
            this.id  = obj.id;
            this.nombre  = obj.nombre;
            this.precio  = parseFloat(obj.precio);
        }
    }


    const recuperados = JSON.parse(localStorage.getItem("miCarro"));
    const listaRecuperada = [];
    for (const producto of recuperados)
    listaRecuperada.push(new Producto(producto));

    let tablaARecuperar = document.getElementById("tabla")

    function renderizarProductos2(){
        for(const producto of listaRecuperada){
            tablaARecuperar.innerHTML +=`
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            </tr>
        `;
}
}

let totalCarritoRecuperado = listaRecuperada.reduce((acumulador2,prod2) => acumulador2+prod2.precio,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarritoRecuperado;

renderizarProductos2()
}