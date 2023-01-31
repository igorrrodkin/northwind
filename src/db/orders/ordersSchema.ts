import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const orders = schemaNorthwind("orders", {
  orderID: numeric("OrderID"),
  customerID: text("CustomerID"),
  employeeID: numeric("EmployeeID"),
  orderDate: text("OrderDate"),
  requiredDate: text("RequiredDate"),
  shippedDate: text("ShippedDate"),
  shipVia: numeric("ShipVia"),
  freight: numeric("Freight"),
  shipName: text("ShipName"),
  shipAddress: text("ShipAddress"),
  shipCity: text("ShipCity"),
  shipRegion: text("ShipRegion"),
  shipPostalCode: text("ShipPostalCode"),
  shipCountry: text("ShipCountry"),
});
