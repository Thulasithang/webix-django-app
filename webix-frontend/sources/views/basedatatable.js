// views/basedatatable.js
import { JetView } from "webix-jet";
export default class BaseDatatable extends JetView {
  constructor(app, config) {
    super(app);
    this.grid_config = config;
  }
  config() {
    const theme = this.app.config.theme;
    const user = webix.storage.local.get("user");
    console.log("user from basedatatable", user);
    return { view: "datatable", css: "dark", columns: this.grid_config.columns };
  }
}
