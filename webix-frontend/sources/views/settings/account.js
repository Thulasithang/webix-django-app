import { JetView } from "webix-jet";
// import { $$ } from "webix";

function saveSettings(user_id) {
  let form = $$("accountForm");
    let values = form.getValues();
    webix.ajax()
    .headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
    })
    .patch(`http://localhost:8000/api/users/${user_id}/`, JSON.stringify({
        username: values.username,
        first_name: values.firstname,
        last_name: values.lastname,
    })).then((response) => {
        return response.json();
    }).then((data) => {
        console.log("data", data);
        if (data !== null) {
            webix.message({type: "status_good",text: "Settings saved successfully!"});
            webix.storage.local.put("user", {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                first_name: data.first_name,
                last_name: data.last_name,
            });
            // window.location.replace("#!/top/dash");
            // this.app.refresh(); // Refresh the app to reflect login status
        } else {
            webix.message({ type: "error", text: "Error saving settings" });
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        webix.message({ type: "error", text: "Error saving settings" });
    });
}

const accountSettings = (user) => ({
  view: "form",
  id: "accountForm",
  elementsConfig: {
    labelWidth: 200,
    labelAlign: "left",
    labelPosition: "top",
    labelHeight: 100,
    // css: { fontSize: "24px !important", color: "#fff" },
  },
  cols: [
    {
      rows: [
        { view: "text", label: "Username", name: "username", value: user.username, required: true, minWidth: 400 },
        { view: "text", label: "First name", name: "firstname", value: user.first_name, required: false },
        { view: "text", label: "Last name", name: "lastname", value: user.last_name, required: false },

        {
          view: "text",
          label: "Email",
          name: "email",
          value: user.email,
          type: "email",
          required: true,
          disabled: true,
        },
        // { view: "text", label: "Password", name: "password", type: "password" },
        {height: 20},
        {
          view: "button",
          value: "Save",
          css: "webix_primary",
          click: () => {
            saveSettings(user.id);
          },
        },
        {},
      ],
    },
    {
    },
  ],
});

export default class AccountsView extends JetView {
  config() {
    const user = webix.storage.local.get("user");
    if (!user) {
      webix.message({type:"error", text:"Please log in first."});
      setTimeout(() => {
        window.location.href = "#!/top/dash";
        // window.location.reload();
      });
    }
    console.log("user: ", user);
    
    return {
      template: "Account settings",
      responsive: true,
      css: "webix_shadow_medium app_start",
      type: "space",
      rows: [
        {
          view: "toolbar",
          cols: [{ view: "label", label: "Account Settings" }],
        },
        accountSettings(user)],
    };
  }
}
