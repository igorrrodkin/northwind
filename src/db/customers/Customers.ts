import { eq } from "drizzle-orm/expressions.js";
import { customers } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { sql } from "drizzle-orm";

class Customers {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const date1 = Date.now();
    const content = await this.db.select(customers).fields({
      customerID: customers.customerID,
      companyName: customers.companyName,
      contactName: customers.contactName,
      contactTitle: customers.contactTitle,
      city: customers.city,
      country: customers.country,
      address: customers.address,
      phone: customers.phone,
    });
    const date2 = Date.now();

    const logs = this.db
      .select(customers)
      .fields({
        customerID: customers.customerID,
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        address: customers.address,
        phone: customers.phone,
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

  public getContentPerPage = async (page: number) => {
    const date1 = Date.now();
    const content = await this.db
      .select(customers)
      .fields({
        customerID: customers.customerID,
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        address: customers.address,
        phone: customers.phone,
      })
      .limit(20)
      .offset((page - 1) * 20);
    const date2 = Date.now();

    const logs = this.db
      .select(customers)
      .fields({
        customerID: customers.customerID,
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        address: customers.address,
        phone: customers.phone,
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

  public getContentByCustomerID = async (customerID: string) => {
    const date1 = Date.now();
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
    const date2 = Date.now();
    const logs = this.db
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
      .where(eq(customers.customerID, customerID))
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
      sql`SELECT count(1) AS total FROM northwind.customers`
    );
    const date2 = Date.now();
    return {
      rows: response.rows[0].total,
      logs: {
        sql: `SELECT count(1) AS total FROM northwind.customers`,
        requestTime: date2 - date1 + "ms",
        date: new Date(),
      },
    };
  };
  // public getContentBySearchInput = async (searchInput: string) => {
  //   const date1 = Date.now();

  //   const content = await this.db
  //     .select(customers)
  //     .where(
  //       or(
  //         like(customers.companyName, "%" + searchInput.toLocaleLowerCase()),
  //         like(customers.contactName, searchInput),
  //         like(customers.contactTitle, searchInput),
  //         like(customers.address, searchInput)
  //       )
  //     );
  //   const date2 = Date.now();
  //   const logs = this.db
  //     .select(customers)
  //     .where(
  //       or(
  //         like(customers.companyName, searchInput),
  //         like(customers.contactName, searchInput),
  //         like(customers.contactTitle, searchInput),
  //         like(customers.address, searchInput)
  //       )
  //     )
  //     .toSQL();
  //   return {
  //     content,
  //     logs: {
  //       sql: logs.sql.split('"').join(""),
  //       date: new Date(),
  //       requestTime: date2 - date1 + "ms",
  //     },
  //   };
  // };
}

export default Customers;
