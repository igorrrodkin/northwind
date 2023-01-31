import { RequestHandler } from "express";
import Employees from "../db/employees/Employees.js";
import { addYearsToDate } from "../utils/dateHandler.js";
import Controller from "./Controller.js";

class EmployeesController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly employees: Employees) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getEmployees);
    this.router.get("/:employeeID", this.getEmployeesByID);
  };
  public getEmployees: RequestHandler = async (req, res) => {
    const content = await this.employees.getContent();
    const mappedContent = content.map((item) => {
      const employeeFullName = `${item.firstName} ${item.lastName}`;
      return {
        name: employeeFullName,
        title: item.title,
        city: item.city,
        phone: item.phone,
        country: item.country,
      };
    });

    res.status(200).send({
      content: mappedContent,
    });
  };
  public getEmployeesByID: RequestHandler = async (req, res) => {
    const employeeID = req.params.employeeID;
    const content = await this.employees.getContentByEmployeeID(employeeID);
    if (!content) {
      res.status(200).send({
        message: "No such employee",
      });
    } else {
      const employeeFullName = `${content.firstName} ${content.lastName}`;
      const reportsTo = content.reportsTo;
      const reportsContent = await this.employees.getFullNameByEmployeeID(
        reportsTo!
      );
      const fullNameReport = `${reportsContent.firstName} ${reportsContent.lastName}`;
      const trueBirthDate = addYearsToDate(content.birthDate!, 32);
      const trueHireDate = addYearsToDate(content.hireDate!, 32);
      content.birthDate = trueBirthDate;
      content.hireDate = trueHireDate;

      res.status(200).send({
        content: {
          name: employeeFullName,
          ...content,
          reportsToName: fullNameReport,
        },
      });
    }
  };
}

export default EmployeesController;
