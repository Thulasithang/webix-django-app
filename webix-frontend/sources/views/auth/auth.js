import { JetView } from "webix-jet";
import { loginView } from "./loginView";
import { signupView } from "./signupView";

export default class AuthView extends JetView {
  config() {
    return {
      type: "space",
      view: "layout",
      css: "auth-container",
      cols: [
        {height: 40},
        {
          rows: [
            {},
            // {
            //     height: 50,
            //   view: "toolbar",
            //   cols: [{ view: "label", label: "Manage Data" }],
            // },
            {
              view: "multiview",
              id: "dataMultiview",
              animate: { type: "slide", subtype: "in" },
              responsive: true,

              cells: [loginView(), signupView()],
            },
            {},
          ],
        },
        {}
      ],
    };
  }

  saveData() {
    const data = $$("formView").getValues();
    $$("loginView").updateItem(data.id, data);
    $$("dataMultiview").setValue("loginView");
  }
}
