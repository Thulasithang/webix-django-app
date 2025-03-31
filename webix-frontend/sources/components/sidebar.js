export function sidebar() {
    const user = webix.storage.local.get("user");
    const isLoggedIn = !!webix.storage.local.get("user");
  return {
    view: "sidebar",
    id: "top:sidebar",
    responsive: "main",
    collapsed: screen !== "wide",
    tooltip: (obj) => {
      return this.getRoot().config.collapsed ? obj.value : "";
    },
    // css: theme,
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
}
