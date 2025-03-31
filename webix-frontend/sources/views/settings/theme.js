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
  
const fontStyleSettings = (font_style, toggleFontStyle) => ({
  view: "layout",
  id: "fontstyle",
  responsive: true,
  type: "space",
  rows: [
    {
      localId: "font_style",
      name: "font_style",
      optionWidth: 120,
      view: "segmented",
      label: "Font Style",
      value: font_style,
      options: [
        { id: "Arial", value: "Arial" },
        { id: "Courier New", value: "Courier New" },
        { id: "Georgia", value: "Georgia" },
        { id: "Times New Roman", value: "Times New Roman" },
        { id: "Verdana", value: "Verdana" },
      ],
      on: {
        onChange: (newFontStyle) => toggleFontStyle(newFontStyle),
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
      // webix.storage.local.put("theme", newTheme);
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

    const font_style = this.app.config.font_style;
    console.log("font_style from theme", font_style);

    const toggleFontStyle = (newFontStyle) => {
      console.log("Switching font style to:", newFontStyle);
      // webix.storage.local.put("font_style", newFontStyle);
      this.app.config.font_style = newFontStyle;

      let fontLink = document.getElementById("fontStylesheet");
      if (!fontLink) {
        fontLink = document.createElement("link");
        fontLink.id = "fontStylesheet";
        fontLink.rel = "stylesheet";
        fontLink.type = "text/css";
        document.head.appendChild(fontLink);
      }
      fontLink.href = 
        newFontStyle === "Arial"
          ? "https://fonts.googleapis.com/css2?family=Arial:wght@400&display=swap"
          : newFontStyle === "Courier New"
          ? "https://fonts.googleapis.com/css2?family=Courier+New:wght@400&display=swap"
          : newFontStyle === "Georgia"
          ? "https://fonts.googleapis.com/css2?family=Georgia:wght@400&display=swap"
          : newFontStyle === "Times New Roman"
          ? "https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400&display=swap"
          : "https://fonts.googleapis.com/css2?family=Verdana:wght@400&display=swap";
      // Apply the font style dynamically
      document.body.style.fontFamily = `"${newFontStyle}", sans-serif`;



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
        fontStyleSettings(font_style, toggleFontStyle),
        {
          view: "button",
          value: "Save",
          css: "webix_primary",
          click: () => {
            webix.message("Settings saved successfully!");
            // Save the theme and font style to local storage or server if needed
            // webix.storage.local.put("theme", theme);
            // webix.storage.local.put("font_style", font_style);
          },
        },
        {},
      ],
    };
  }
}
