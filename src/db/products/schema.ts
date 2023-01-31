import { text, numeric, pgSchema } from "drizzle-orm-pg";

const schemaNorthwind = pgSchema("northwind");

export const products = schemaNorthwind("products", {
  productID: numeric("ProductID"),
  productName: text("ProductName"),
  supplierID: numeric("SupplierID"),
  categoryID: numeric("CategoryID"),
  quantityPerUnit: text("QuantityPerUnit"),
  unitPrice: numeric("UnitPrice"),
  unitsInStock: numeric("UnitsInStock"),
  unitsOnOrder: numeric("UnitsOnOrder"),
  reorderLevel: numeric("ReorderLevel"),
  discontinued: numeric("Discontinued"),
});

// export type Client = InferModel<typeof supplies>;
