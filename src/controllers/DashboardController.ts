import { RequestHandler } from "express";
import Controller from "./Controller.js";

class DashboardController extends Controller {
  public readonly path: string;

  public constructor(path: string) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getLogs);
  };
  public getLogs: RequestHandler = async (req, res) => {
    res.status(200).send({
      content: "logs from local session should be here",
    });
  };
}

export default DashboardController;
