import "dotenv/config";
import App from "./App.js";
import { pool } from "./db/connection.js";
// import { migrate } from "drizzle-orm-pg/postgres.js/migrator.js";

import { drizzle, NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import SuppliesController from "./controllers/SuppliesController.js";
import Supplies from "./db/supplies/Supplies.js";
import ProductsController from "./controllers/ProductsController.js";
import Products from "./db/products/Products.js";
import OrdersController from "./controllers/OrdersController.js";
import Orders from "./db/orders/Orders.js";
import EmployeesController from "./controllers/EmployeesController.js";
import Employees from "./db/employees/Employees.js";
import CustomersController from "./controllers/CustomersController.js";
import Customers from "./db/customers/Customers.js";
import SearchController from "./controllers/SearchController.js";
import DashboardController from "./controllers/DashboardController.js";

const main = async () => {
  const client: NodePgDatabase = drizzle(pool);

  const controllers = [
    new SuppliesController("/suppliers", new Supplies(client)),
    new ProductsController(
      "/products",
      new Products(client),
      new Supplies(client)
    ),
    new OrdersController("/orders", new Orders(client)),
    new EmployeesController("/employees", new Employees(client)),
    new CustomersController("/customers", new Customers(client)),
    new SearchController(
      "/search",
      new Customers(client),
      new Products(client)
    ),
    new DashboardController("/dash"),
  ];
  const port = process.env.PORT_APP || 5000;

  const app = new App(controllers, port);
  app.listen();
};

main();
