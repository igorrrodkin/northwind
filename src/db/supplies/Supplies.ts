import { eq } from "drizzle-orm/expressions.js";
import { supplies } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";

class Supplies {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const content = await this.db.select(supplies).fields({
      company: supplies.companyName,
      contact: supplies.contactName,
      title: supplies.contactTitle,
      city: supplies.city,
      country: supplies.country,
    });
    return content;
  };

  public getContentBySupplierID = async (supplierID: string) => {
    const content = await this.db
      .select(supplies)
      .where(eq(supplies.supplierID, supplierID));
    return content[0];
  };

  public getCompanyNameByID = async (supplierID: string) => {
    const content = await this.db
      .select(supplies)
      .fields({
        companyName: supplies.companyName,
      })
      .where(eq(supplies.supplierID, supplierID));
    return content[0].companyName;
  };
}

export default Supplies;
