import { eq } from "drizzle-orm/expressions.js";
import { products } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/driver.js";

class Products {
  public constructor(public db: NodePgDatabase) {}

  public getContent = async () => {
    const content = await this.db.select(products).fields({
      product: products.productID,
      name: products.productName,
      qtPerUnit: products.quantityPerUnit,
      price: products.unitPrice,
      stock: products.unitsInStock,
      orders: products.unitsOnOrder,
    });
    return content;
  };

  public getContentByProductID = async (productID: string) => {
    const content = await this.db
      .select(products)
      .where(eq(products.productID, productID));
    return content[0];
  };
}

export default Products;
