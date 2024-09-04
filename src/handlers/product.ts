import { request, Request, Response } from "express";
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res: Response) => {// request (lo que pido) y response (lo que obtengo)
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({data: products})
}

export const getProductsById = async (req: Request, res: Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    res.json({data: product})
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
   
};

export const updateProduct = async (req: Request, res: Response) => {// request (lo que pido) y response (lo que obtengo)
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    res.json({data: product})

    //Actualizar
    await product.update(req.body)
    await product.save()
}

export const updateAvaliability = async (req: Request, res: Response) => {// request (lo que pido) y response (lo que obtengo)
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProducts = async (req: Request, res: Response) => {// request (lo que pido) y response (lo que obtengo)
    
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})
   
}