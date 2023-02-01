import { eq } from "drizzle-orm/expressions.js";
import { supplies } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";

class Supplies {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const date1 = Date.now();

    const content = await this.db.select(supplies).fields({
      id: supplies.supplierID,
      company: supplies.companyName,
      contact: supplies.contactName,
      title: supplies.contactTitle,
      city: supplies.city,
      country: supplies.country,
    });
    const date2 = Date.now();
    const logs = this.db
      .select(supplies)
      .fields({
        id: supplies.supplierID,
        company: supplies.companyName,
        contact: supplies.contactName,
        title: supplies.contactTitle,
        city: supplies.city,
        country: supplies.country,
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

  public getContentBySupplierID = async (supplierID: string) => {
    const date1 = Date.now();

    const content = await this.db
      .select(supplies)
      .where(eq(supplies.supplierID, supplierID));
    const date2 = Date.now();
    const logs = this.db
      .select(supplies)
      .where(eq(supplies.supplierID, supplierID))
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

  //   public getCompanyNameByID = async (supplierID: string) => {
  //     const content = await this.db
  //       .select(supplies)
  //       .fields({
  //         companyName: supplies.companyName,
  //       })
  //       .where(eq(supplies.supplierID, supplierID));
  //     return content[0].companyName;
  //   };
}

export default Supplies;
