let { sqlite: db } = require('../config/db')

const write = async (req, res) => {
    try {
        let newTask = req.body
        await db('productos').insert(newTask)
        res.redirect('./index')
        } 
    catch(err){
        console.log(err);
    }
}

const read = async (req, res) => {
    try { 
        let data = await db('productos').whereNot('id_productos', 0)
        res.json(data);
    }
    catch(err) {
        console.log(err);
        }
}

const update = async (req, res) => {
    try {
        await db('productos').where({ id: req.body.id }).update({id: req.body.id, name: req.body.name, description: req.body.description, price: req.body.price, thumbnail: req.body.thumbnail, stock: req.body.stock})
        res.send("UPDATE OK")
    } 
    catch(err){
        console.log("ERROR DESDE updateTask",err)
    }
}

const deleted = async (req, res) => {
    try {
        await db('productos').where({ id: req.body.id }).del()
        res.send("DELETE OK")
    } 
    catch(err){
        console.log("ERROR DESDE updateTask",err)
    }
}


module.exports = {
    write,
    read,
    update,
    deleted
}