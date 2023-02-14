import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const customers = schemaNorthwind("customers", {
  customerID: numeric("CustomerID").notNull(),
  companyName: text("CompanyName").notNull(),
  contactName: text("ContactName").notNull(),
  contactTitle: text("ContactTitle").notNull(),
  address: text("Address"),
  city: text("City"),
  region: text("Region"),
  postalCode: text("PostalCode"),
  country: text("Country"),
  phone: text("Phone"),
  fax: text("Fax"),
});
