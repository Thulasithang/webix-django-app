import { JetView } from "webix-jet";


const themeSettings = (theme, toggleTheme) => ({
  view: "layout",
      id: "themesettings",
      responsive: true,
      type: "space",
      css: theme === "webix_dark" ? "dark-style" : "light-style",
      rows: [
        {
          localId: "skin",
          name: "skin",
          optionWidth: 120,
          view: "segmented",
          label: "Theme",
          css: theme,
          value: theme,
          options: [
            { id: "webix_light", value: "Default" },
            // { id:"flat-shady", value:"Shady" },
            { id: "compact-default", value: "Compact" },
            { id: "webix_dark", value: "Dark" },
          ],
          on: {
            onChange: (newTheme) => toggleTheme(newTheme),
          },
        },
        {},
      ],
    });

export default class ThemeView extends JetView {
  config() {
    const theme = this.app.config.theme;
    console.log("theme from theme", theme);

    const toggleTheme = (newTheme) => {
      console.log("Switching theme to:", newTheme);
    
      webix.storage.local.put("theme", newTheme);
      this.app.config.theme = newTheme;
    
      webix.delay(
        () => {
          this.app.refresh(); // Refreshes the app with new theme
        },
        null,
        null,
        100
      );
    };
    
    return {
      view: "layout",
      id: "theme:settings",
      responsive: true,
      type: "space",
      rows: [
        {
          view: "toolbar",
          cols: [{ view: "label", label: "Theme Settings" }],
          css: theme,
        },
        themeSettings(theme, toggleTheme),
      ],
    };
  }
}
