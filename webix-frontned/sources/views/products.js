// views/products.js
import BaseDatatable from "views/basedatatable";
import { plugins } from "webix-jet";
export default class ProductsView extends BaseDatatable {
  constructor(app) {
    super(app, {
      columns: [
        { id: "id", header: "" },
        { id: "product", header: "Product" },
        { id: "stock", header: "In stock" },
      ],
    });
  }
  init() {
    this.use(plugins.Menu, "table");

    // Fetch and load data into the table
    webix
      .ajax()
      .get("https://dummyjson.com/products")
      .then((response) => {
        const products = response.json().products; // Extract "products" array
        console.log(products);

        const table = this.getRoot().queryView("datatable"); // Get datatable instance
        if (table) {
          table.parse(products); // Load data into table
        } else {
          console.error("Datatable component not found");
        }
      });
  }
}
