import { RequestHandler } from "express";
import Orders from "../db/orders/Orders.js";
import { validDateByConvertingToDate } from "../utils/dateHandler.js";
import Controller from "./Controller.js";

class OrdersController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly orders: Orders) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", this.getOrders);

    this.router.get("/:orderID", this.getOrdersByOrderID);
  };

  public getOrders: RequestHandler = async (req, res) => {
    const dbResponse = await this.orders.getFullContent();
    const orderIDs = dbResponse.content.map((item) => item.orderID);
    const orderIDsUnique = Array.from(new Set(orderIDs));
    const mappedContent = orderIDsUnique.map((id) => {
      const filteredByID = dbResponse.content.filter(
        (element) => element.orderID == id
      );
      const products = filteredByID.length;
      const quantity = filteredByID.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!);
      }, 0);
      const price = filteredByID.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!) * parseFloat(obj.unitPrice!);
      }, 0);
      const dataByID = dbResponse.content.find((item) => item.orderID == id);

      const validShippedDate = validDateByConvertingToDate(
        dataByID!.shipped!,
        16
      );
      return {
        id: id,
        price: price.toFixed(2),
        products: products,
        quantity: quantity,
        shipped: validShippedDate,
        shipName: dataByID?.shipName,
        city: dataByID?.city,
        country: dataByID?.country,
      };
    });
    res.status(200).send({
      content: mappedContent,
      logs: dbResponse.logs,
    });
  };

  public getOrdersByOrderID: RequestHandler = async (req, res) => {
    const orderID = req.params.orderID;
    const dbResponse = await this.orders.getFullContentByOrderID(orderID);
    if (!dbResponse.content.length) {
      res.status(200).send({
        message: "No such order",
      });
    } else {
      const totalProducts = dbResponse.content.length;
      const totalQuantity = dbResponse.content.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!);
      }, 0);
      const totalPrice = dbResponse.content.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!) * parseFloat(obj.unitPrice!);
      }, 0);
      const totalDiscount = dbResponse.content.reduce((acc, obj) => {
        return (
          acc +
          parseInt(obj.quantity!) *
            parseFloat(obj.unitPrice!) *
            parseFloat(obj.discount!)
        );
      }, 0);

      const validShippedDate = validDateByConvertingToDate(
        dbResponse.content[0].shippedDate!,
        16
      );
      const validRequiredDate = validDateByConvertingToDate(
        dbResponse.content[0].requiredDate!,
        16
      );
      const validOrderDate = validDateByConvertingToDate(
        dbResponse.content[0].orderDate!,
        16
      );

      const productsInOrderMapped = dbResponse.content.map((item) => {
        return {
          product: item.productName,
          quantity: +item.quantity!,
          orderPrice: item.unitPrice + "$",
          totalPrice:
            (+item.quantity! * parseFloat(item.unitPrice!)).toFixed(2) + "$",
          discount: parseFloat(item.discount!) * 100 + "%",
        };
      });

      res.status(200).send({
        content: {
          customerID: dbResponse.content[0].customerID,
          shipName: dbResponse.content[0].shipName,
          totalProducts,
          totalQuantity,
          totalPrice: totalPrice + "$",
          totalDiscount: totalDiscount.toFixed(2) + "$",
          shipVia: dbResponse.content[0].shipVia,
          freight: dbResponse.content[0].freight,
          orderDate: validOrderDate,
          requiredDate: validRequiredDate,
          shippedDate: validShippedDate,
          shipCity: dbResponse.content[0].shipCity,
          region: dbResponse.content[0].region,
          shipPostalCode: dbResponse.content[0].shipPostalCode,
          shipCountry: dbResponse.content[0].shipCountry,
          productsInOrder: productsInOrderMapped,
        },
        logs: dbResponse.logs,
      });
    }
  };
}

export default OrdersController;
