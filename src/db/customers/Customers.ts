import { eq } from "drizzle-orm/expressions.js";
import { customers } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";

class Customers {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const content = await this.db.select(customers).fields({
      companyName: customers.companyName,
      contactName: customers.contactName,
      contactTitle: customers.contactTitle,
      city: customers.city,
      country: customers.country,
      address: customers.address,
    });
    return content;
  };

  public getContentByCustomerID = async (customerID: string) => {
    const content = await this.db
      .select(customers)
      .fields({
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        address: customers.address,
        city: customers.city,
        postalCode: customers.postalCode,
        region: customers.region,
        country: customers.country,
        phone: customers.phone,
        fax: customers.fax,
      })
      .where(eq(customers.customerID, customerID));
    return content[0];
  };
}

export default Customers;
