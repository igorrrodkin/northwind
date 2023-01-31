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
    const fullData = await this.orders.getFullContent();
    const orderIDs = fullData.map((item) => item.id);
    const orderIDsUnique = Array.from(new Set(orderIDs));
    const mappedContent = orderIDsUnique.map((id) => {
      const filteredByID = fullData.filter((element) => element.id == id);
      const products = filteredByID.length;
      const quantity = filteredByID.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!);
      }, 0);
      const price = filteredByID.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!) * parseFloat(obj.unitPrice!);
      }, 0);
      const dataByID = fullData.find((item) => item.id == id);

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
    });
  };
  public getOrdersByOrderID: RequestHandler = async (req, res) => {
    const orderID = req.params.orderID;
    const fullContent = await this.orders.getFullContentByOrderID(orderID);
    if (!fullContent.length) {
      res.status(200).send({
        message: "No such order",
      });
    } else {
      const totalProducts = fullContent.length;
      const totalQuantity = fullContent.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!);
      }, 0);
      const totalPrice = fullContent.reduce((acc, obj) => {
        return acc + parseInt(obj.quantity!) * parseFloat(obj.unitPrice!);
      }, 0);
      const totalDiscount = fullContent.reduce((acc, obj) => {
        return (
          acc +
          parseInt(obj.quantity!) *
            parseFloat(obj.unitPrice!) *
            parseFloat(obj.discount!)
        );
      }, 0);

      const validShippedDate = validDateByConvertingToDate(
        fullContent[0].shippedDate!,
        16
      );
      const validRequiredDate = validDateByConvertingToDate(
        fullContent[0].requiredDate!,
        16
      );
      const validOrderDate = validDateByConvertingToDate(
        fullContent[0].orderDate!,
        16
      );

      const productsInOrderMapped = fullContent.map((item) => {
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
          customerID: fullContent[0].customerID,
          shipName: fullContent[0].shipName,
          totalProducts,
          totalQuantity,
          totalPrice: totalPrice + "$",
          totalDiscount: totalDiscount.toFixed(2) + "$",
          shipVia: fullContent[0].shipVia,
          freight: fullContent[0].freight,
          orderDate: validOrderDate,
          requiredDate: validRequiredDate,
          shippedDate: validShippedDate,
          shipCity: fullContent[0].shipCity,
          region: fullContent[0].region,
          shipPostalCode: fullContent[0].shipPostalCode,
          shipCountry: fullContent[0].shipCountry,
          productsInOrder: productsInOrderMapped,
        },
      });
    }
  };
}

export default OrdersController;
