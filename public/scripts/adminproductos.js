const templateProducto = document.getElementById('template-producto').content
const products = document.getElementById('products')
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => { fetchData() });

const fetchData = async () => {
    try{
        console.log("desde el fetch")
        const resProd = await fetch('http://localhost:8080/api/productos')
        const product = await resProd.json()
        pintarProductos(product);
    } catch(err) {
        console.log(err)
    }
}

const pintarProductos = (datos) => {
    products.innerHTML = '';
        datos.forEach(producto => {
        templateProducto.querySelectorAll('td')[0].textContent = producto.id_productos
        templateProducto.querySelectorAll('td')[1].textContent = producto.name
        templateProducto.querySelectorAll('td')[2].textContent = producto.description
        templateProducto.querySelectorAll('td')[3].textContent = producto.price
        templateProducto.querySelector('img').setAttribute('src', `${producto.thumbnail}`) 
        templateProducto.querySelectorAll('td')[5].textContent = producto.stock
        templateProducto.querySelector('.btn-danger').dataset.id = producto.id_productos
        const clone = templateProducto.cloneNode(true)
        fragment.appendChild(clone)
    })
    products.appendChild(fragment)
}

products.addEventListener('click', e => {
    btnAccion(e);
})

function btnAccion (e) {
    if (e.target.classList.contains('trash-can'))
    deleteProduct(e.path[1].dataset.id)
    else if (e.target.classList.contains('btn-danger'))
    deleteProduct(e.path[0].dataset.id)
}

const deleteProduct = async (id) => {
    let idnum = {
        "idnum" : `${id}`
    }
    await fetch(`http://localhost:8080/api/producto/${id}`, {
        method: 'POST',
        body: JSON.stringify(idnum),
        headers:{ 'Content-Type': 'application/json' }
        })
    window.location.href = window.location.href
}
