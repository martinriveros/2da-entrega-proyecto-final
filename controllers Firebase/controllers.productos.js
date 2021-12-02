let { dbfirebase : db } = require('../config/db')


const write = async (req, res) => {

    try{
    console.log("DESDE LA FUNCION WRITE")
    const productCollection = db.collection('productos');
    
    const ID = productCollection.doc()
    ID.set({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock
        });
    res.send("Producto almacenado con exito!")
    }
    catch(err){
        console.log("ESTE ES EL ERROR", err)
    }
}

const read = async (req, res) => {

    try{
        const result = []
        const snapshot = await db.collection('productos').get();
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

// HAY QUE INCLUIR EN EL JSON el ID Que se quiere modificar de la tabla de firebase ( POR POSTMAN)

const update = async (req, res) => {
    try {
        console.log(req.body.id)
        const actualizado = await db.collection('productos').doc(req.body.id).set(req.body);
        res.json(actualizado)
    } catch (error) {
        throw new Error(`Error al actualizar: ${error}`)
    }
}

// HAY QUE ENVIAR EN EL JSON el ID ( POR POSTMAN)

const deleted = async (req,res) => {
    try {
        const item = await db.collection('productos').doc(req.body.id).delete();
        res.json(`producto con el id ${req.body.id} eliminado`)
    } catch (error) {
        throw new Error(`Error al borrar: ${error}`)
    }
}

module.exports = {
    write,
    read,
    update,
    deleted
}