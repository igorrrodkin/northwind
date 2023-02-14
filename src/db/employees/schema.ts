import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const employees = schemaNorthwind("employees", {
  employeeID: numeric("EmployeeID").notNull(),
  lastName: text("LastName").notNull(),
  firstName: text("FirstName").notNull(),
  title: text("Title").notNull(),
  titleOfCourtesy: text("TitleOfCourtesy").notNull(),
  birthDate: text("BirthDate").notNull(),
  hireDate: text("HireDate").notNull(),
  address: text("Address").notNull(),
  city: text("City").notNull(),
  region: text("Region"),
  postalCode: text("PostalCode").notNull(),
  country: text("Country").notNull(),
  homePhone: text("HomePhone").notNull(),
  extension: text("Extension").notNull(),
  notes: text("Notes").notNull(),
  reportsTo: text("ReportsTo"),
});
