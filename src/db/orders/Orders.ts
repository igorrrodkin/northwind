import { eq } from "drizzle-orm/expressions.js";
import { orders } from "./ordersSchema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { orderDetails } from "./orderDetailsSchema.js";
import { products } from "../products/schema.js";
import { shippers } from "./shippersSchema.js";

class Orders {
  public constructor(public db: NodePgDatabase) {}

  public getFullContent = async () => {
    const content = await this.db
      .select(orders)
      .fields({
        id: orders.orderID,
        shipped: orders.shippedDate,
        shipName: orders.shipName,
        city: orders.shipCity,
        country: orders.shipCountry,
        productID: orderDetails.productID,
        unitPrice: orderDetails.unitPrice,
        quantity: orderDetails.quantity,
        discount: orderDetails.discount,
      })
      .leftJoin(orderDetails, eq(orders.orderID, orderDetails.orderID));
    return content;
  };

  public getFullContentByOrderID = async (orderID: string) => {
    const content = await this.db
      .select(orders)
      .fields({
        id: orders.orderID,
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
        productID: orderDetails.productID,
        unitPrice: orderDetails.unitPrice,
        quantity: orderDetails.quantity,
        discount: orderDetails.discount,
        productName: products.productName,
      })
      .leftJoin(orderDetails, eq(orders.orderID, orderDetails.orderID))
      .leftJoin(products, eq(orderDetails.productID, products.productID))
      .leftJoin(shippers, eq(orders.shipVia, shippers.shipperID))
      .where(eq(orders.orderID, orderID));
    return content;
  };
}

export default Orders;
