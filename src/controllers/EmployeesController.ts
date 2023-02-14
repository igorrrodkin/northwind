import { RequestHandler } from "express";
import Employees from "../db/employees/Employees.js";
import { addYearsToDate } from "../utils/dateHandler.js";
import { sqlSyntaxUpperCase } from "../utils/logsFormatter.js";
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
    const data = await this.employees.getContent();
    const mappedContent = data.content.map((item) => {
      const employeeFullName = `${item.firstName} ${item.lastName}`;
      return {
        id: item.id,
        name: employeeFullName,
        title: item.title,
        city: item.city,
        phone: item.phone,
        country: item.country,
      };
    });

    res.status(200).send({
      content: mappedContent,
      logs: {
        sql: sqlSyntaxUpperCase(data.logs.sql),
        date: data.logs.date,
        requestTime: data.logs.requestTime,
      },
    });
  };
  public getEmployeesByID: RequestHandler = async (req, res) => {
    const employeeID = req.params.employeeID;
    const data = await this.employees.getContentByEmployeeID(employeeID);
    if (!data.content) {
      res.status(200).send({
        content: [],
      });
    } else {
      const employeeFullName = `${data.content.firstName} ${data.content.lastName}`;
      const reportsTo = data.content.reportsTo;
      let fullNameReport: string | null;
      if (reportsTo) {
        const reportsContent = await this.employees.getFullNameByEmployeeID(
          reportsTo
        );
        fullNameReport = `${reportsContent.firstName} ${reportsContent.lastName}`;
      } else {
        fullNameReport = null;
      }

      const trueBirthDate = addYearsToDate(data.content.birthDate, 32);
      const trueHireDate = addYearsToDate(data.content.hireDate, 32);
      data.content.birthDate = trueBirthDate;
      data.content.hireDate = trueHireDate;

      res.status(200).send({
        content: [
          {
            name: employeeFullName,
            ...data.content,
            reportsToName: fullNameReport,
          },
        ],
        logs: {
          sql: sqlSyntaxUpperCase(data.logs.sql),
          date: data.logs.date,
          requestTime: data.logs.requestTime,
        },
      });
    }
  };
}

export default EmployeesController;
