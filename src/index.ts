import server from "./server";
import colors from 'colors'

const port = process.env.PORT || 4000
server.listen(port, () => { //listen monta la aplicacion en express
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})