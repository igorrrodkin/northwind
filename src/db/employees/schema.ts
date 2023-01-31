import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const employees = schemaNorthwind("employees", {
  employeeID: numeric("EmployeeID"),
  lastName: text("LastName"),
  firstName: text("FirstName"),
  title: text("Title"),
  titleOfCourtesy: text("TitleOfCourtesy"),
  birthDate: text("BirthDate"),
  hireDate: text("HireDate"),
  address: text("Address"),
  city: text("City"),
  region: text("Region"),
  postalCode: text("PostalCode"),
  country: text("Country"),
  homePhone: text("HomePhone"),
  extension: text("Extension"),
  notes: text("Notes"),
  reportsTo: text("ReportsTo"),
});
