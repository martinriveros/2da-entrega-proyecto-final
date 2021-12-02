let database = 'mariadb';
let passport = require('passport');
const { Router } = require("express");
const router = Router(); 

//     case 'mariadb':
        let controllersProductos = require('../controllers Mariadb/controllers.productos')
        let controllersCarritos = require('../controllers Mariadb/controllers.carritos')
    
//     case 'firebase':
//         controllersProductos = require('../controllers Firebase/controllers.productos')
//         controllersCarritos = require('../controllers Firebase/controllers.carritos')

//     case 'mongodb':
//         controllersProductos = require('../controllers MongoDb/controllers.productos')
//         controllersCarritos = require('../controllers MongoDb/controllers.carritos')    

//     case 'sqlite':
//         controllersProductos = require('../controllers Sqlite/controllers.productos')
//         controllersCarritos = require('../controllers Sqlite/controllers.carritos')


function serverRouter(app){
    
    app.use("/api", router);


    router.post('/productos', controllersProductos.write)
    router.get('/productos', controllersProductos.read)
    router.put('/updateproductos', controllersProductos.update)
    router.delete('/deleteproductos', controllersProductos.deleted)
    router.post('/producto/:id', controllersProductos.deleteProduct)

    router.post('/carritos', controllersCarritos.write)
    router.get('/carritos', controllersCarritos.read)
    router.delete('/carritos/:id', controllersCarritos.deleted)


    // Me trae todos los productos por id por GET en un JSON //
    router.get('/productos/:id', (req, res) => {
        async function getById() {
            try {
                let id = req.params.id;
                let datos = JSON.parse(await fs.promises.readFile('./public/database/productos.txt'));
                let responseFilter = datos.filter(elemento => elemento.id==id);
                if (responseFilter.length != 0){
                res.json(responseFilter);
                } else {
                    let object = {
                        error: -2,
                        descripcion: `ruta '/${req.params.id}' por metodo ${req.method} no implementada`
                    }
                    res.send(object)
                }
            }
        catch (err) {
                    console.log(err);
                }
            }
        getById()
    })

    router.get('/loadproduct', (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('login');
    }, (req, res) => {res.render('loadproduct');
    });

    // Carga la ruta carrito (SOLO PARA ADMIN) // 
    router.get('/carrito', (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('login');
    }, (req, res) => {res.render('carrito');
    })
    // Carga la ruta index //
    router.get('/index', (req, res) => {
        res.render('index');
    });

    // Carga la ruta login //
    router.get('/login', (req, res) => {
        res.render('login');
    });

    // Recibe credenciales e inicia sesion //
    router.post('/login', passport.authenticate('local',{
        successRedirect: "/api/loadproduct",
        failureRedirect: "login"
    }));
    
    router.get('/:id/productos', (req, res) => {
    });

    // Envia error si la ruta es inexistente //
    router.get('/:params', (req, res) => {
        let object = {
            error: -2,
            descripcion: `ruta '/${req.params.params}' por metodo ${req.method} no implementada`
        }
        res.send(object)
    });

}
module.exports = serverRouter;