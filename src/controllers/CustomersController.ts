import { RequestHandler } from "express";
import Customers from "../db/customers/Customers.js";
import { sqlSyntaxUpperCase } from "../utils/logsFormatter.js";
import Controller from "./Controller.js";

class CustomersController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly customers: Customers) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getCustomers);
    this.router.get("/:customerID", this.getCustomerByID);
  };
  public getCustomers: RequestHandler = async (req, res) => {
    const rowsResponse = await this.customers.getRowsQuantity();
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
      const data = await this.customers.getContentPerPage(+page);
      res.status(200).send({
        pages: pagesQuantity,
        content: data.content,
        logs: [
          {
            sql: rowsResponse.logs.sql,
            date: rowsResponse.logs.date,
            requestTime: rowsResponse.logs.requestTime,
          },
          {
            sql: sqlSyntaxUpperCase(data.logs.sql),
            date: data.logs.date,
            requestTime: data.logs.requestTime,
          },
        ],
      });
    }
  };
  public getCustomerByID: RequestHandler = async (req, res) => {
    const customerID = req.params.customerID;
    const data = await this.customers.getContentByCustomerID(customerID);
    if (!data.content) {
      res.status(404).send({
        content: [],
      });
    } else {
      res.status(200).send({
        content: [data.content],
        logs: {
          sql: sqlSyntaxUpperCase(data.logs.sql),
          date: data.logs.date,
          requestTime: data.logs.requestTime,
        },
      });
    }
  };
}

export default CustomersController;
