import { JetView } from "webix-jet";
import { loginView } from "./loginView";
import { signupView } from "./signupView";

export default class AuthView extends JetView {
  config() {
    return {
      type: "space",
      // view: "layout",
      css: "auth-container",
      cols: [
        // { height: 40, view: "resizer", gravity: 1 },
        {
          rows: [
            {},
            {
              // gravity: 5,
              view: "multiview",
              id: "dataMultiview",
              css: "webix_auth_multiview",
              animate: { type: "slide", subtype: "in" },
              responsive: true,
    
              cells: [loginView(), signupView()],
            },
            {},
          ],
        },
        // {},
      ],
    };
  }

  saveData() {
    const data = $$("formView").getValues();
    $$("loginView").updateItem(data.id, data);
    $$("dataMultiview").setValue("loginView");
  }
}
