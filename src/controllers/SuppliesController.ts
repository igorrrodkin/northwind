import { RequestHandler } from "express";
import Supplies from "../db/supplies/Supplies.js";
import { sqlSyntaxUpperCase } from "../utils/logsFormatter.js";
import Controller from "./Controller.js";
import { catchAsync } from "../utils/catchAsync.js";

class SuppliesController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly supplies: Supplies) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", catchAsync(this.getSupplies));
    this.router.get("/:supplierID", catchAsync(this.getSuppliesBySupplierID));
  };
  public getSupplies: RequestHandler = async (req, res) => {
    const rowsResponse = await this.supplies.getRowsQuantity();
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
      const dbResponse = await this.supplies.getContentPerPage(+page);
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
  public getSuppliesBySupplierID: RequestHandler = async (req, res) => {
    const supplierID = req.params.supplierID;
    const dbResponse = await this.supplies.getContentBySupplierID(supplierID);
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

export default SuppliesController;
