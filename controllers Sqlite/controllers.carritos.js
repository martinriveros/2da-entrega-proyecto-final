let { sqlite: db } = require('../config/db')


const write = async (req, res) => {
    try {
        let carritos = req.body
        Object.values(carritos).forEach(async (carrito) => {
            await db('carritos').insert(carrito)
        })
        res.redirect('./index')
        }
    catch(err){
        console.log(err);
        }
}

const read = async (req, res) => {
    try {
        let carritos = await db.from('carritos').select('id_carrito', 'id_producto', 'cantidad')
        await res.send(carritos)
        }
    catch(err){
        console.log(err);
        }
}

const deleted = async (req, res) => {
    try {
        let idnum = Number(req.params.id)
        await db.from('carritos').where('id_carrito', idnum).del()
        res.send("OK")
        }
    catch(err){
        console.log(err);
        }
}


module.exports = {
    write,
    read,
    deleted
}