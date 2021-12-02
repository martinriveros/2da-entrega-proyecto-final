const db = require('./index')
let mongoose = require('mongoose')

// Seleccionar la base de datos mariadb, firebase, mongodb o sqlite
let database = 'mariadb'

switch (database) {

    case 'mariadb':
        const mysql = require('knex')({
            client: 'mysql',
            connection: db,
            pool: {min:0, max:10}
            });
        createTablesMysql(mysql)
        module.exports = { mysql }

    break;

    case 'firebase':
        const admin = require("firebase-admin");

        const serviceAccount = require('./firebase config/firebaseconfig.json')

        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        })

        const dbfirebase = admin.firestore();
        module.exports = { dbfirebase }
    break;

    case 'mongodb':
        const MONGO_DB = process.env.MONGO_DB_URI;
        const DB_NAME = process.env.DB_NAME;
        const CONNECT = `${MONGO_DB}/${DB_NAME}`

        let connection = null;

        (async ()=>{
            try {
                console.log(`Conexion de mongo creada en ${CONNECT}`)
                connection = await mongoose.connect(`${CONNECT}`)
            } catch (error) {
                console.log('error al conectarse a Mongo')
                
            }
        })()

        const Schema = mongoose.Schema;

        const productosSchema = new Schema({

            id_producto: Number(), 
            name: String(),
            description: Number(),
            price:String(),
            thumbnail: String(),
            stock: Number()
        })

        const carritosSchema = new Schema({

            id: Number(),
            productos_carrito:[
                            {id_producto: Number(),
                            title: String() ,
                            cantidad:Number(),    
                            }
            ]
        })

        const productosModel = mongoose.model('productos', productosSchema)
        const carritosModel = mongoose.model('carritos', carritosSchema)

        module.exports = { productosModel, carritosModel }
    break;

    case 'sqlite':
        const sqlite = { development: {
        client: 'sqlite3',
        connection: {
        filename: '../DB/ecommerce.sqlite'
        }
        },
        useNullAsDefault: true
        };
        module.exports = { sqlite }
    break;
}

function createTablesMysql(mysql) { 

mysql.schema.hasTable("productos").then(function (exists) {
    if (!exists) {
      return mysql.schema.createTable("productos", (table) => {
        table.increments('id_productos').primary();
        table.string("name", 128).notNullable()
        table.string("description", 1000).notNullable()
        table.integer("price", 100).notNullable()
        table.string("thumbnail", 1000).notNullable()
        table.integer("stock", 100).notNullable()
      });
    }
  });

mysql.schema.hasTable("carritos").then(function (exists) {
    if (!exists) {
      return mysql.schema.createTable("carritos", (table) => {
        table.increments(); 
        table.integer("id_carrito", 255).notNullable()
        table.integer("id_producto", 128).notNullable()
        table.integer("cantidad", 128).notNullable()
      });
    }
});

}
