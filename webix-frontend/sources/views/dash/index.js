import { JetView } from "webix-jet";
import UserPreferencesView from "../../data/userData";

export default class TopView extends JetView {
  config() {
    const user = webix.storage.local.get("user");
    console.log("user from basedatatable", user);

    return {
      type: "space",
      rows: [
        {
          view: "toolbar",
          cols: [{ view: "label", label: `Hello ${user.username} !!!` }],
        },
        {
          view: "multiview",
          id: "dataMultiview",
          animate: { type: "slide", subtype: "in" },
          cells: [this.listView(), this.formView()],
        },
      ],
    };
  }

  listView() {
    return {
      UserPreferencesView,
    };
  }

  formView() {
    return {
      id: "formView",
      view: "form",
      scroll: false,
      elements: [
        { template: "Edit Book", type: "header" },
        { view: "text", label: "Rank", name: "rank", labelWidth: 70 },
        { view: "text", label: "Title", name: "title", labelWidth: 70 },
        { view: "text", label: "Year", name: "year", labelWidth: 70 },
        {
          margin: 5,
          cols: [
            {
              view: "button",
              value: "Cancel",
              width: 120,
              click: () => $$("dataMultiview").setValue("listView"),
            },
            {
              view: "button",
              value: "Save",
              width: 120,
              css: "webix_primary",
              click: () => this.saveData(),
            },
          ],
        },
      ],
    };
  }

  saveData() {
    const data = $$("formView").getValues();
    $$("listView").updateItem(data.id, data);
    $$("dataMultiview").setValue("listView");
  }
}
