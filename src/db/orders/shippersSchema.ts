import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const shippers = schemaNorthwind("shippers", {
  shipperID: numeric("ShipperID"),
  companyName: text("CompanyName"),
  phone: text("Phone"),
});
