import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const orderDetails = schemaNorthwind("order_details", {
  orderID: numeric("OrderID"),
  productID: numeric("ProductID"),
  unitPrice: numeric("UnitPrice"),
  quantity: text("Quantity"),
  discount: text("Discount"),
});
