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
// import winston from "winston";

const main = async () => {
  //   const migrationsClient: any = postgres(
  //     "postgres://postgres:123456789@psql-db.cbdczouan2lk.us-east-1.rds.amazonaws.com:5432/postgres",
  //     {
  //       max: 1,
  //     }
  //   );
  const client: NodePgDatabase = drizzle(pool);

  //   await migrate(client, { migrationsFolder: "./migrations" });

  //   const logger = winston.createLogger({
  //     // format: winston.format.json(),
  //     transports: [
  //       new winston.transports.File({
  //         filename: "logs.log",
  //       }),
  //     ],
  //   });
  const logs: object[] = [];
  const controllers = [
    new SuppliesController("/suppliers", logs, new Supplies(client)),
    new ProductsController(
      "/products",
      logs,
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
    new DashboardController("/dash", logs),
  ];
  const port = process.env.PORT_APP || 5000;

  const app = new App(controllers, port);
  app.listen();
};

main();
