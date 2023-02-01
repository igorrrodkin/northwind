import { eq } from "drizzle-orm/expressions.js";
import { products } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/driver.js";
import { supplies } from "../supplies/schema.js";

class Products {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const date1 = Date.now();

    const content = await this.db.select(products).fields({
      product: products.productID,
      name: products.productName,
      qtPerUnit: products.quantityPerUnit,
      price: products.unitPrice,
      stock: products.unitsInStock,
      orders: products.unitsOnOrder,
    });
    const date2 = Date.now();
    const logs = this.db
      .select(products)
      .fields({
        product: products.productID,
        name: products.productName,
        qtPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
        orders: products.unitsOnOrder,
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

  public getContentByProductID = async (productID: string) => {
    const date1 = Date.now();

    const content = await this.db
      .select(products)
      .fields({
        ...products,
        supplier: supplies.companyName,
      })
      .leftJoin(supplies, eq(supplies.supplierID, products.supplierID))
      .where(eq(products.productID, productID));
    const date2 = Date.now();
    const logs = this.db
      .select(products)
      .fields({
        ...products,
        supplier: supplies.companyName,
      })
      .leftJoin(supplies, eq(supplies.supplierID, products.supplierID))
      .where(eq(products.productID, productID))
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

  //   public getContentBySearchInput = async (searchInput: string) => {
  //     const date1 = Date.now();

  //     const content = await this.db
  //       .select(products)
  //       .where(
  //         or(
  //           like(products.productName, "%" + searchInput.toLowerCase() + "%"),
  //           like(products.productName, searchInput + "%")
  //         )
  //       );
  //     const date2 = Date.now();
  //     const logs = this.db
  //       .select(products)
  //       .where(like(products.productName, searchInput))
  //       .toSQL();
  //     return {
  //       content,
  //       logs: {
  //         sql: logs.sql.split('"').join(""),
  //         date: new Date(),
  //         requestTime: date2 - date1 + "ms",
  //       },
  //     };
  //   };
}

export default Products;
