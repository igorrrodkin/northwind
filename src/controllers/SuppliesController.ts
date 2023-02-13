import { RequestHandler } from "express";
import Supplies from "../db/supplies/Supplies.js";
import { sqlSyntaxUpperCase } from "../utils/logsFormatter.js";
import Controller from "./Controller.js";

class SuppliesController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly supplies: Supplies) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getSupplies);
    this.router.get("/:supplierID", this.getSuppliesBySupplierID);
  };
  public getSupplies: RequestHandler = async (req, res) => {
    const dbResponse = await this.supplies.getContent();
    res.status(200).send({
      content: dbResponse.content,
      logs: {
        sql: sqlSyntaxUpperCase(dbResponse.logs.sql),
        date: dbResponse.logs.date,
        requestTime: dbResponse.logs.requestTime,
      },
    });
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
