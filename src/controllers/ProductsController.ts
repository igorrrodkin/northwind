import { RequestHandler } from "express";
import Products from "../db/products/Products.js";
import Supplies from "../db/supplies/Supplies.js";
import { sqlSyntaxUpperCase } from "../utils/logsFormatter.js";
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
    const rowsResponse = await this.products.getRowsQuantity();
    const pagesQuantity = Math.floor((rowsResponse.rows as number) / 20 + 1);
    let page = req.query.page;
    if (!page) {
      page = "1";
    }
    if (+page > pagesQuantity) {
      res.status(404).send({
        content: [],
      });
    } else {
      const dbResponse = await this.products.getContentPerPage(+page);
      res.status(200).send({
        pages: pagesQuantity,
        content: dbResponse.content,
        logs: [
          {
            sql: rowsResponse.logs.sql,
            date: rowsResponse.logs.date,
            requestTime: rowsResponse.logs.requestTime,
          },
          {
            sql: sqlSyntaxUpperCase(dbResponse.logs.sql),
            date: dbResponse.logs.date,
            requestTime: dbResponse.logs.requestTime,
          },
        ],
      });
    }
  };

  public getProductsByProductID: RequestHandler = async (req, res) => {
    const productID = req.params.productID;
    const dbResponse = await this.products.getContentByProductID(productID);
    if (!dbResponse.content) {
      res.status(200).send({
        content: [],
      });
    } else {
      res.status(200).send({
        content: [dbResponse.content],
        logs: {
          sql: sqlSyntaxUpperCase(dbResponse.logs.sql),
          date: dbResponse.logs.date,
          requestTime: dbResponse.logs.requestTime,
        },
      });
    }
  };
}

export default ProductsController;
