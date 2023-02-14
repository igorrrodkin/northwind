import { eq } from "drizzle-orm/expressions.js";
import { supplies } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { sql } from "drizzle-orm";

class Supplies {
  public constructor(public db: NodePgDatabase) {}

  public getContentPerPage = async (page: number) => {
    const date1 = Date.now();

    const content = await this.db
      .select(supplies)
      .fields({
        id: supplies.supplierID,
        company: supplies.companyName,
        contact: supplies.contactName,
        title: supplies.contactTitle,
        city: supplies.city,
        country: supplies.country,
      })
      .limit(20)
      .offset((page - 1) * 20);
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
      .limit(20)
      .offset((page - 1) * 20)
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

  public getRowsQuantity = async () => {
    const date1 = Date.now();
    const response = await this.db.execute(
      sql`SELECT count(1) AS total FROM northwind.supplies`
    );
    const date2 = Date.now();
    return {
      rows: response.rows[0].total,
      logs: {
        sql: `SELECT count(1) AS total FROM northwind.supplies`,
        requestTime: date2 - date1 + "ms",
        date: new Date(),
      },
    };
  };
}

export default Supplies;
