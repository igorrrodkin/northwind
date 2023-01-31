import { RequestHandler } from "express";
import Customers from "../db/customers/Customers.js";
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
    const content = await this.customers.getContent();
    res.status(200).send({
      content: content,
    });
  };
  public getCustomerByID: RequestHandler = async (req, res) => {
    const customerID = req.params.customerID;
    const content = await this.customers.getContentByCustomerID(customerID);
    if (!content) {
      res.status(200).send({
        message: "No such customer",
      });
    } else {
      res.status(200).send({
        content,
      });
    }
  };
}

export default CustomersController;
