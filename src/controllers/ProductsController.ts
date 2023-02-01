import { RequestHandler } from "express";
// import winston, { loggers } from "winston";
import Products from "../db/products/Products.js";
import Supplies from "../db/supplies/Supplies.js";
import Controller from "./Controller.js";

class ProductsController extends Controller {
  public readonly path: string;

  public constructor(
    path: string,
    public readonly products: Products,
    public readonly supplies: Supplies
  ) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getProducts);
    this.router.get("/:productID", this.getProductsByProductID);
  };
  public getProducts: RequestHandler = async (req, res) => {
    const dbResponse = await this.products.getContent();
    res.status(200).send({
      content: dbResponse.content,
      logs: dbResponse.logs,
    });
  };

  public getProductsByProductID: RequestHandler = async (req, res) => {
    const productID = req.params.productID;
    const dbResponse = await this.products.getContentByProductID(productID);
    if (!dbResponse.content) {
      res.status(200).send({
        message: "No such product",
      });
    } else {
      res.status(200).send({
        content: dbResponse.content,
        logs: dbResponse.logs,
      });
    }
  };
}

export default ProductsController;
