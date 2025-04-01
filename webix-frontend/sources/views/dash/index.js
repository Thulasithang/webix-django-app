import { JetView } from "webix-jet";
import UserPreferencesView from "../../data/userData";

export default class TopView extends JetView {
  config() {
    const userIsLoggedIn = webix.storage.local.get("user");
    // console.log("user from basedatatable", user);

    return {
      type: "space",
      rows: [
        // {
        //   view: "toolbar",
        //   cols: [{ view: "label", label: `Hello ${user.username} !!!` }],
        // },
        userIsLoggedIn
          ? {
              view: "template",
              template: `<div class="welcome-message">Hello ${userIsLoggedIn.username} !!!</div><div>Welcome to your dashboard</div>
          <div>Navigate through the pages using the arrow keys</div>`,
              css: "welcome-message",
              // height: auto,
              height: 150,
              // autoHeight: true,
              type: "header",
            }
          : {
              view: "template",
              template: `<div class="welcome-message">Hello ${"user"} !!!</div><div>Why don't you Login to see more options</div>
          <div>Go to the login option or just press Ctrl+Shift+L to login or signup</div>`,
              css: "welcome-message",
              // height: auto,
              height: 150,
              // autoHeight: true,
              type: "header",
            },
        {},
      ],
    };
  }
}
