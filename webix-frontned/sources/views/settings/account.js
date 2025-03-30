import { JetView } from "webix-jet";
// import { $$ } from "webix";

function saveSettings(formId) {
  const form = formId;
  if (form.validate()) {
    const values = form.getValues();
    webix.message("Saved: " + JSON.stringify(values));
  }
}

const accountSettings = (theme) => ({
  view: "form",
  id: "accountForm",
  // css: { background: theme === "webix_dark" ? "dark-style" : "" },
  css: theme === "webix_dark" ? "dark-style" : "light-style",
  elementsConfig: {
    labelWidth: 200,
    labelAlign: "left",
    labelPosition: "top",
    labelHeight: 100,
    css: { fontSize: "24px !important", color: "#fff" },
  },
  cols: [
    {
      rows: [
        { view: "text", label: "Username", name: "username", required: true },
        {
          view: "text",
          label: "Email",
          name: "email",
          type: "email",
          required: true,
          disabled: true,
        },
        { view: "text", label: "Password", name: "password", type: "password" },
        {height: 20},
        {
          view: "button",
          value: "Save",
          css: "webix_primary",
          click: function () {
            saveSettings("accountForm");
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
    const theme = webix.storage.local.get("theme") || "default";
    const user = webix.storage.local.get("user");
    if (!user) {
      webix.message("Please log in first.");
      setTimeout(() => {
        window.location.href = "#!/top/dash";
        window.location.reload();
      });
    }
    return {
      template: "Account settings",
      responsive: true,
      css: "webix_shadow_medium app_start",
      type: "space",
      rows: [
        {
          view: "toolbar",
          cols: [{ view: "label", label: "Notification Settings" }],
          css: theme,
        },
        accountSettings(theme)],
    };
  }
}
