import { JetView } from "webix-jet";


const themeSettings = (theme, toggleTheme) => ({
  view: "layout",
      id: "themesettings",
      responsive: true,
      type: "space",
      rows: [
        {
          localId: "skin",
          name: "skin",
          optionWidth: 120,
          view: "segmented",
          label: "Theme",
          value: theme,
          options: [
            { id: "light", value: "Default" },
            // { id:"flat-shady", value:"Shady" },
            { id: "contrast", value: "Compact" },
            { id: "dark", value: "Dark" },
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

      // Apply the theme dynamically
      let themeLink = document.getElementById("themeStylesheet");

      if (!themeLink) {
        themeLink = document.createElement("link");
        themeLink.id = "themeStylesheet";
        themeLink.rel = "stylesheet";
        document.head.appendChild(themeLink);
      }

      themeLink.href =
        newTheme === "contrast"
          ? "https://cdn.webix.com/edge/skins/contrast.css"
          : `https://cdn.webix.com/edge/skins/${newTheme}.css`;

      webix.delay(() => this.app.refresh(), null, null, 100);
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
        },
        themeSettings(theme, toggleTheme),
      ],
    };
  }
}
