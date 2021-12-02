let { dbfirebase : db } = require('../config/db')

const write = async (req, res) => {

    try{
    console.log("DESDE LA FUNCION WRITE")
    const productCollection = db.collection('carritos');
    
    const ID = productCollection.doc()
    ID.set({
        id: req.body.id,
        id_carrito: req.body.id_carrito,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        });
    res.send("Carrito almacenado con exito!")
    }
    catch(err){
        console.log("ESTE ES EL ERROR", err)
    }
}

const read = async (req, res) => {
    try{
        const result = []
        const snapshot = await db.collection('carritos').get();
        snapshot.forEach(doc => {
            result.push({ id: doc.id, ...doc.data()})
            })
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log("Error desde READ", err)
    }
}

const deleted = async (req, res) => {
    try {
        console.log(req.params.id)
        const item = await db.collection('carritos').doc(req.params.id).delete();
        res.json(`producto con el id ${req.params.id} eliminado`)
    } catch (error) {
        throw new Error(`Error al borrar: ${error}`)
    }
}


module.exports = {
    write,
    read,
    deleted
}