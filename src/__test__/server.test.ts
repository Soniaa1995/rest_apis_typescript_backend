
import {connectDB} from '../server'
import db from '../config/bd'

jest.mock('../config/bd')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Hubo un error al conectar a la base de datos'))
        //crea funcion en ambiente del mock simulado y le pasamos base de datos y el metodo para ver su comportamiento /primero miras el objeto y luego la funcion
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la base de datos')
        )
    })
})

