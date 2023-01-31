import { RequestHandler } from "express";
import Controller from "./Controller.js";

class DashboardController extends Controller {
  public readonly path: string;
  //   public readonly logs: object[];

  public constructor(path: string, public logs: object[]) {
    super("");
    this.path = path;
    this.logs = logs;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getLogs);
  };
  public getLogs: RequestHandler = async (req, res) => {
    res.status(200).send({
      content: this.logs,
    });
  };
}

export default DashboardController;
