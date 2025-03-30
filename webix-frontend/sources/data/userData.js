import { JetView } from "webix-jet";

export const userData = webix.ajax("http://localhost:8000/api/users/1/").then((response) => {
    const user = response.json();
    console.log("user", user);
  
    return {
      view: "form",
      id: "user_form",
      elements: [
        { view: "text", label: "Username", name: "username", value: user.username },
        { view: "text", label: "Email", name: "email", value: user.email },
        { view: "text", label: "Theme", name: "theme", value: user.theme },
        { view: "text", label: "Language", name: "language", value: user.language },
        {
          margin: 5,
          cols: [
            {
              view: "button",
              value: "Save",
              width: 120,
              css: "webix_primary",
              click: () => this.saveUserData(),
            },
          ],
        },
      ],
    };
  }
  );


export default class UserPreferencesView extends JetView {
  config() {
    return {
      template: "User Preferences",
      responsive: true,
      css: "webix_shadow_medium app_start",
      type: "space",
      rows: [userData],
    };
  }
}