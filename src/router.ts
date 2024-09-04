import { Router } from "express";
import { createProduct, deleteProducts, getProducts, getProductsById, updateAvaliability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The Product name
 *          example: Monitor de 49 pulgadas
 *        price:
 *          type: number
 *          description: The Product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The Product avilability
 *          example: true
 */


/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */

//Routing
router.get("/", getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product bases on its unique ID
 *    parameters:
  *    - in: path
  *      name: id
  *      description: The ID of the product to retrieve
  *      required: true
  *      schema:
  *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Not found
 *      404:
 *        description: Invalid ID
 */

router.get("/:id", 
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  getProductsById)


/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor 49 pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - invalid input data
 */

router.post("/",
  //Validacion
  body("name").notEmpty().withMessage("Este campo no puede estar vacio"),

  body("price")
      .isNumeric().withMessage("Valor no válido")
      .notEmpty().withMessage("El precio no puede estar vacio")
      .custom((value) => value > 0).withMessage("Precio no válido"),
    handleInputErrors,
    createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Return the updated product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor 49 pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID or Invalid input data
 *      404:
 *        description: Prodcut not found
 * 
 * 
 */

router.put("/:id",
  param('id').isInt().withMessage('Id no válido'),
  body("name").notEmpty().withMessage("Este campo no puede estar vacio"),

  body("price")
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage("El precio no puede estar vacio")
    .custom((value) => value > 0).withMessage("Precio no válido"),
  body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product Availability
 *    tags:
 *      - Products
 *    description: Return the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/shemas/Product'
 *      400:
 *        description: Bad Request -  Invalid ID
 *      404:
 *        description: Product not found
 * 
 */

router.patch("/:id", 
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  updateAvaliability);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by a given ID
 *    tags:
 *      - Products
 *    description: Return a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Producto eliminado'
 *      400:
 *        description: Bad Request -  Invalid ID
 *      404:
 *        description: Product not found
 * 
 */

router.delete("/:id", 
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  deleteProducts
);

export default router;
