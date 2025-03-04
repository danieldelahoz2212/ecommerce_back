import express, { Application } from "express";
import userRouters from "../routes/users";
import productRouters from "../routes/products";
import categoryRouters from "../routes/category";
import orderRouters from "../routes/orders";
import rolRouters from "../routes/roles";
import cors from "cors";

import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
    products: "/api/products",
    category: "/api/category",
    order: "/api/order",
    rol: "/api/rol",
  };

  constructor() {
    this.app = express();
    this.port = String(process.env.PORT);

    this.dbConnection();

    this.middlewares();

    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("funciona");
    } catch (error) {
      throw new Error(`Error con la conexion nota: ${error}`);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRouters);
    this.app.use(this.apiPaths.products, productRouters);
    this.app.use(this.apiPaths.category, categoryRouters);
    this.app.use(this.apiPaths.order, orderRouters);
    this.app.use(this.apiPaths.rol, rolRouters);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
