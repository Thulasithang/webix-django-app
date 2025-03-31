// import "./styles/app.css";
// import "./styles/contrast.css";
import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

// dynamic import of views
const modules = import.meta.glob("./views/**/*.js");
const views = (name) => {
  const path = Object.keys(modules).find(
    (p) =>
      p.endsWith(`/${name}.js`) ||
      p.endsWith(`/${name}/index.js`) ||
      p.includes(`/${name}/`)
  );
  if (path) {
    console.log("Path found:", path);
    return modules[path]().then((x) => x.default);
  } else {
    return Promise.reject(new Error(`View ${name} not found`));
  }
};

// locales, optional
const locales = import.meta.glob("./locales/*.js");
const words = (name) =>
  locales[`./locales/${name}.js`]().then((x) => x.default);

export default class MyApp extends JetApp {
  constructor(config) {
    let userPreferences = webix.storage.local.get("user_preferences") || {};
    let theme = userPreferences.theme || "light";
    let font_style = userPreferences.font_style || "Times New Roman";
    let font_size = userPreferences.font_size || "16px";
    const size = () => {
      const screen = document.body.offsetWidth;
      return screen > 1210 ? "wide" : screen > 1060 ? "mid" : "small";
    };

    const defaults = {
      id: import.meta.env.VITE_APPNAME,
      version: import.meta.env.VITE_VERSION,
      router: import.meta.env.VITE_BUILD_AS_MODULE ? EmptyRouter : HashRouter,
      debug: !import.meta.env.PROD,
      start: "/home",
      size: size(),
      // set custom view loader, mandatory
      views,
      theme: theme, // Default theme
      scrollY: true,
      scroll: true,
    };

    super({ ...defaults, ...config });
    // super({ ...defaults, ...config });
    this.applyTheme(theme);
    this.config.theme = theme;
    this.config.font_style = font_style;
    this.config.font_size = font_size;
    // this.setTheme = (theme) => {
    //   this.config.theme = theme;
    //   this.refresh();
    // };

    webix.UIManager.addHotKey("H", () => this.show("/home"));
    // webix.UIManager.addHotKey("Ctrl+alt+D", () => window.location.href("#!/top/dash"));
    webix.UIManager.addHotKey("Ctrl+alt+D", () => this.show("/top/dash"));
    webix.UIManager.addHotKey("Ctrl+shift+S", () => this.show("/settings/account"));
    webix.UIManager.addHotKey("Ctrl+shift+L", () => this.show("/auth"));

    // locales plugin, optional
    this.use(plugins.Locale, {
      path: words,
      storage: this.webix.storage.session,
    });

    webix.event(window, "resize", () => {
      const newSize = size();
      if (newSize != this.config.size) {
        this.config.size = newSize;
        this.refresh();
      }
    });
  }

  setTheme(theme) {
    // webix.storage.local.put("theme", theme);
    this.config.themes = theme;
    this.applyTheme(theme);
    this.app.refresh();
  }

  applyTheme(theme) {
    let themeLink = document.getElementById("themeStylesheet");
    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = "themeStylesheet";
      themeLink.rel = "stylesheet";
      themeLink.type = "text/css";
      document.head.appendChild(themeLink);
    }

    themeLink.href =
      theme === "contrast"
        ? "https://cdn.webix.com/edge/skins/dark.css"
        : `https://cdn.webix.com/edge/skins/${theme}.css`;
  }

  setFontStyle(font_style) {
    // webix.storage.local.put("font_style", font_style);
    this.config.font_style = font_style;
    this.refresh();
  }

  applyFontStyle(font_style) {
    let fontLink = document.getElementById("fontStylesheet");
    if (!fontLink) {
      fontLink = document.createElement("link");
      fontLink.id = "fontStylesheet";
      fontLink.rel = "stylesheet";
      // fontLink.type = "text/css";
      document.head.appendChild(fontLink);
    }

    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Sofia:wght@300;400;700&display=swap";
    // fontLink.href = `https://fonts.googleapis.com/css2?family=${font_style}:wght@300;400;700&display=swap`;
    document.body.style.fontFamily = `"${font_style}", sans-serif`;
  }
}
if (!import.meta.env.VITE_BUILD_AS_MODULE) {
  // webix.ready(() => new MyApp().render());
  webix.ready(() => {
    if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll)
      webix.CustomScroll.init();
    new MyApp().render();
  });
}
