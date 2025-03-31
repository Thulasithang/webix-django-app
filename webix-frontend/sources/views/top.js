import { JetView, plugins } from "webix-jet";
import UserPopupView from "./auth/userPopup";
import AuthModal from "./auth/auth";

export default class TopView extends JetView {
  config() {
    const { _, getLang, setLang } = this.app.getService("locale");
    const theme = this.app.config.theme;
    const screen = this.app.config.size;
    const isLoggedIn = !!webix.storage.local.get("user");
    var locales = {
      view: "toolbar",
      cols: [
        {
          view: "icon",
          icon: "mdi mdi-menu",
          click: function () {
            $$("top:sidebar").toggle();
          },
        },
        {
          view: "button",
          value: _("hello"),
          width: 200,
          click: () => {
            webix.message(_("hello"));
          },
          attributes: {
            "aria-label": _("hello"),
            role: "button",
          },
        },
        {},
        {
          view: "segmented",
          options: ["en", "de"],
          value: getLang(),
          width: 200,
          on: {
            onChange: (value) => setLang(value),
          },
        },
      ],
    };

    var sidebar = {
      view: "sidebar",
      id: "top:sidebar",
      responsive: "main",
      collapsed: screen !== "wide",
      tooltip: (obj) => {
        return this.getRoot().config.collapsed ? obj.value : "";
      },
      css: theme,
      minWidth: 150,
      layout: "y",
      select: true,
      data: [
        { value: "Dashboard", id: "dash", icon: "mdi mdi-view-dashboard" },
        { value: "Data", id: "data", icon: "mdi mdi-table" },
        {
          // select: true,
          value: "Settings",
          id: "settings",
          icon: "mdi mdi-cog",
          data: isLoggedIn
            ? [
                {
                  id: "account",
                  value: "Account",
                  icon: "mdi mdi-account",
                },
                {
                  id: "notifications",
                  value: "Notifications",
                  icon: "mdi mdi-bell",
                },
                { id: "theme", value: "Theme", icon: "mdi mdi-pencil" },
                {
                  id: "privacy",
                  value: "Privacy",
                  icon: "mdi mdi-shield",
                },
              ]
            : [
                {
                  id: "theme",
                  value: "Theme",
                  icon: "mdi mdi-pencil",
                },
              ],
        },
      ],
      on: {
        onAfterSelect: function (id) {
          if (id) {
            this.$scope.show(`${id}`);
          }
        },
      },
    };

    const toolbar = {
      view: "toolbar",
      css: theme,
      padding: 10,
      height: 58,
      cols: [
        { css: "logo" },
        { view: "icon", icon: "mdi mdi-bell", badge: "5" },
        // { view: "icon", icon: "mdi mdi-settings" },
        isLoggedIn
          ? {
              view: "icon",
              icon: "mdi mdi-account-circle",
              badge: "1",
              tooltip: "User Profile",
              click: function () {
                // this.$scope.ui(UserPopupView).showMenu(pos);
                this.$scope.userPopup.showMenu(this.$view);
                return false;
              },
            }
          : {
              view: "button",
              value: "Login",
              width: 100,
              // click: () => this.showLoginWindow(),
              click: function () {
                window.location.href = "#!/auth";
              },
            },
      ],
    };

    var ui = {
      type: "clean",
      paddingX: 5,
      responsive: true,
      css: "#5A5A5A !important",
      cols: [
        {
          paddingX: 5,
          paddingY: 10,
          rows: [{ css: theme, rows: [sidebar] }],
        },
        {
          css: "#5A5A5A !important",
          type: "wide",
          paddingY: 10,
          paddingX: 5,
          rows: [{ $subview: true }],
        },
      ],
    };

    return {
      resonsive: true,
      css: theme,
      rows: [toolbar, locales, ui],
    };
  }
  init() {
    this.userPopup = this.ui(UserPopupView);
    // this.use(plugins.Menu, "top:menu");
    this.use(plugins.Menu, "top:sidebar");

    const sidebar = $$("top:sidebar");
    const user = webix.storage.local.get("user");
    const sidebar_settings = $$("settings");
    const sidebar_settings_list = user ? ["account", "notifications", "theme", "privacy"] : ["theme"];

  // Hotkey for Arrow Down (↓) - Moves selection down
  webix.UIManager.addHotKey("down", () => {
    const selected = sidebar.getSelectedId();
    // if (!user) {
    //   const selected_settings = sidebar_settings.getSelectedId();
    console.log("selected: ", selected);
    if (selected) {
      const nextId = sidebar.getNextId(selected);
      sidebar.select(nextId);
      if (nextId && sidebar_settings_list.includes(nextId)) {
        sidebar_settings.select(nextId);
      }
    }
  });

  // Hotkey for Arrow Up (↑) - Moves selection up
  webix.UIManager.addHotKey("up", () => {
    const selected = sidebar.getSelectedId();
    if (selected) {
      const prevId = sidebar.getPrevId(selected);
      if (prevId) sidebar.select(prevId);
    }
  });

  webix.UIManager.addHotKey("right", () => {
    const selected = sidebar.getSelectedId();
    if (selected && sidebar.getItem(selected).data) {
      console.log("selected from here: ", selected);
      sidebar.open(selected);
    }
  });


  }

  

  openAuthModal() {
    if (!$$("authModal")) {
      this.ui(AuthModal).show();
    } else {
      $$("authModal").show();
    }
  }

  showProfilePopup() {
    if (!$$("userPopup")) {
      this.ui(UserPopupView).show();
    } else {
      $$("userPopup").show();
    }
  }
}
