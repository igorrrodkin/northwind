import { eq } from "drizzle-orm/expressions.js";
import { employees } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";

class Employees {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const date1 = Date.now();
    const content = await this.db.select(employees).fields({
      id: employees.employeeID,
      firstName: employees.firstName,
      lastName: employees.lastName,
      title: employees.title,
      city: employees.city,
      phone: employees.homePhone,
      country: employees.country,
    });
    const date2 = Date.now();

    const logs = this.db
      .select(employees)
      .fields({
        firstName: employees.firstName,
        lastName: employees.lastName,
        title: employees.title,
        city: employees.city,
        phone: employees.homePhone,
        country: employees.country,
      })
      .toSQL();
    return {
      content,
      logs: {
        sql: logs.sql.split('"').join(""),
        date: new Date(),
        requestTime: date2 - date1 + "ms",
      },
    };
  };

  public getContentByEmployeeID = async (employeeID: string) => {
    const date1 = Date.now();
    const content = await this.db
      .select(employees)
      .fields({
        firstName: employees.firstName,
        lastName: employees.lastName,
        title: employees.title,
        titleOfCourtesy: employees.titleOfCourtesy,
        birthDate: employees.birthDate,
        hireDate: employees.hireDate,
        address: employees.address,
        city: employees.city,
        postalCode: employees.postalCode,
        country: employees.country,
        homePhone: employees.homePhone,
        extension: employees.extension,
        notes: employees.notes,
        reportsTo: employees.reportsTo,
      })
      .where(eq(employees.employeeID, employeeID));
    const date2 = Date.now();
    const logs = this.db
      .select(employees)
      .fields({
        firstName: employees.firstName,
        lastName: employees.lastName,
        title: employees.title,
        titleOfCourtesy: employees.titleOfCourtesy,
        birthDate: employees.birthDate,
        hireDate: employees.hireDate,
        address: employees.address,
        city: employees.city,
        postalCode: employees.postalCode,
        country: employees.country,
        homePhone: employees.homePhone,
        extension: employees.extension,
        notes: employees.notes,
        reportsTo: employees.reportsTo,
      })
      .where(eq(employees.employeeID, employeeID))
      .toSQL();

    return {
      content: content[0],
      logs: {
        sql: logs.sql.split('"').join(""),
        date: new Date(),
        requestTime: date2 - date1 + "ms",
      },
    };
  };

  public getFullNameByEmployeeID = async (employeeID: string) => {
    const names = await this.db
      .select(employees)
      .fields({
        firstName: employees.firstName,
        lastName: employees.lastName,
      })
      .where(eq(employees.employeeID, employeeID));
    return names[0];
  };
}

export default Employees;
