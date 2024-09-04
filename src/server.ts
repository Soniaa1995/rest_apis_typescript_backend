import express  from "express";
import router from "./router";
import db from "./config/bd";
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

//conectar a base de datos
export async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.magenta('Conexion existosa'))
    } catch (error){
        //console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'))
    }
}
connectDB()

//Instancia de Express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback){ //origin: quien me manda la peticion y callbacl nos permite o deniega la conexion
        if(origin === process.env.FRONTEND_URL){
           callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }  
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev')) //te permite debugguear si la peticion va muy lenta

server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server