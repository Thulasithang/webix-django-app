import { JetView } from "webix-jet";

function saveSettings(formId) {
    // eslint-disable-next-line no-undef
    const form = $$(formId);
    if (form.validate()) {
        const values = form.getValues();
        webix.message("Saved: " + JSON.stringify(values));
    }
}

const notificationSettings = (theme) => ({
  view: "form",
  id: "notificationForm",
  css: theme === "webix_dark" ? "dark-style" : "light-style",
  elementsConfig: {
    labelWidth: 200,
    // labelAlign: "right",
    // bottomPadding: 10,
    // inputWidth: 300,
    // labelAlign: "left",
    // labelPosition: "top",
    // labelWidth: 100,
    labelHeight: 100,
    // label: "Notification Settings",
    css: { fontSize: "24px !important" },
  },
  cols: [
    {
      rows: [
        { view: "switch", label: "Email Notifications", name: "email_notify" },
        { view: "switch", label: "Push Notifications", name: "push_notify" },
        {
          view: "richselect",
          label: "Notification Frequency",
          name: "notify_freq",
          options: ["Daily", "Weekly", "Monthly"],
          value: "Daily",
          width: 500,
        },
        { height: 20 },
        {
          view: "button",
          value: "Save",
            css: "webix_primary",
          click: function () {
            saveSettings("notificationForm");
          },
        },
        {},
      ],
    },
    {},
  ],
});

export default class NotificationsView extends JetView {
  config() {
    const theme = webix.storage.local.get("theme") || "default";
    console.log("theme", theme);
    return {
      template: "Notification settings",
      type: "space",
      rows: [
        {
          view: "toolbar",
          cols: [{ view: "label", label: "Notification Settings" }],
          css: theme,
        },
        notificationSettings(theme),
      ],
    };
  }
}
