import { eq } from "drizzle-orm/expressions.js";
import { orders } from "./ordersSchema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { orderDetails } from "./orderDetailsSchema.js";
import { products } from "../products/schema.js";
import { shippers } from "./shippersSchema.js";

class Orders {
  public constructor(public db: NodePgDatabase) {}

  public getFullContent = async () => {
    const date1 = Date.now();
    const content = await this.db
      .select(orders)
      .fields({
        shipped: orders.shippedDate,
        shipName: orders.shipName,
        city: orders.shipCity,
        country: orders.shipCountry,
        ...orderDetails,
      })
      .leftJoin(orderDetails, eq(orders.orderID, orderDetails.orderID));
    const date2 = Date.now();
    const logs = this.db
      .select(orders)
      .fields({
        shipped: orders.shippedDate,
        shipName: orders.shipName,
        city: orders.shipCity,
        country: orders.shipCountry,
        ...orderDetails,
      })
      .leftJoin(orderDetails, eq(orders.orderID, orderDetails.orderID))
      .toSQL();
    return {
      content,
      logs: {
        sql: logs.sql.split('"').join(""),
        date: new Date(),
        requestTime: date2 - date1 + "ms",
      },
    };
  };

  public getFullContentByOrderID = async (orderID: string) => {
    const date1 = Date.now();

    const content = await this.db
      .select(orders)
      .fields({
        customerID: orders.customerID,
        shipName: orders.shipName,
        shipVia: shippers.companyName,
        freight: orders.freight,
        shippedDate: orders.shippedDate,
        orderDate: orders.orderDate,
        requiredDate: orders.requiredDate,
        shipCity: orders.shipCity,
        region: orders.shipRegion,
        shipPostalCode: orders.shipPostalCode,
        shipCountry: orders.shipCountry,
        ...orderDetails,
        productName: products.productName,
      })
      .leftJoin(orderDetails, eq(orders.orderID, orderDetails.orderID))
      .leftJoin(products, eq(orderDetails.productID, products.productID))
      .leftJoin(shippers, eq(orders.shipVia, shippers.shipperID))
      .where(eq(orders.orderID, orderID));
    const date2 = Date.now();
    const logs = this.db
      .select(orders)
      .fields({
        customerID: orders.customerID,
        shipName: orders.shipName,
        shipVia: shippers.companyName,
        freight: orders.freight,
        shippedDate: orders.shippedDate,
        orderDate: orders.orderDate,
        requiredDate: orders.requiredDate,
        shipCity: orders.shipCity,
        region: orders.shipRegion,
        shipPostalCode: orders.shipPostalCode,
        shipCountry: orders.shipCountry,
        ...orderDetails,
        productName: products.productName,
      })
      .leftJoin(orderDetails, eq(orders.orderID, orderDetails.orderID))
      .leftJoin(products, eq(orderDetails.productID, products.productID))
      .leftJoin(shippers, eq(orders.shipVia, shippers.shipperID))
      .where(eq(orders.orderID, orderID))
      .toSQL();

    return {
      content: content,
      logs: {
        sql: logs.sql.split('"').join(""),
        date: new Date(),
        requestTime: date2 - date1 + "ms",
      },
    };
  };
}

export default Orders;
