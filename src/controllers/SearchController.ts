import { RequestHandler } from "express";
import Customers from "../db/customers/Customers.js";
import Products from "../db/products/Products.js";
import Controller from "./Controller.js";

class SearchController extends Controller {
  public readonly path: string;

  public constructor(
    path: string,
    public readonly customers: Customers,
    public readonly products: Products
  ) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.post("/:searchInput", this.searchCustomersProducts);
  };

  public searchCustomersProducts: RequestHandler = async (req, res) => {
    const searchInput = req.params.searchInput;
    const tableForSearch: "products" | "customers" = req.body.tableForSearch;
    if (tableForSearch == "products") {
      const dbResponse = await this.products.getContent();
      const filteredContent = dbResponse.content.filter((item) =>
        item.name?.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (!filteredContent.length) {
        res.status(200).send({
          content: [],
        });
      } else {
        res.status(200).send({
          content: filteredContent,
          logs: dbResponse.logs,
        });
      }
    } else if (tableForSearch == "customers") {
      const dbResponse = await this.customers.getContent();
      const filteredContent = dbResponse.content.filter(
        (item) =>
          item.companyName?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.contactName?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.contactTitle
            ?.toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          item.address?.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (!filteredContent.length) {
        res.status(200).send({
          content: [],
        });
      } else {
        res.status(200).send({
          content: filteredContent,
          logs: dbResponse.logs,
        });
      }
    }
  };
}
export default SearchController;
