import { RequestHandler } from "express";
// import winston, { loggers } from "winston";
import Products from "../db/products/Products.js";
import Supplies from "../db/supplies/Supplies.js";
import Controller from "./Controller.js";

class ProductsController extends Controller {
  public readonly path: string;

  public constructor(
    path: string,
    public logger: object[],
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
    // this.logger.log("info", "get products");
    this.logger.push({ message: "products" });
    const content = await this.products.getContent();
    res.status(200).send({
      content: content,
    });
  };
  public getProductsByProductID: RequestHandler = async (req, res) => {
    // this.logger.log("info", "get products by ID");
    this.logger.push({ message: "products by ID" });

    const productID = req.params.productID;
    const content = await this.products.getContentByProductID(productID);
    if (!content) {
      res.status(200).send({
        message: "No such product",
      });
    } else {
      const suplierId = content.supplierID;
      const supplier = await this.supplies.getCompanyNameByID(suplierId!);
      const contentWithSpplierName = { ...content, supplier };
      res.status(200).send({
        content: contentWithSpplierName,
      });
    }
  };
}

export default ProductsController;
