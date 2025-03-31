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
    let theme = webix.storage.local.get("theme") || "webix_dark";
    const size = () => {
      const screen = document.body.offsetWidth;
      return screen > 1210 ? "wide" : (screen > 1060 ? "mid" : "small");
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
    // this.setTheme = (theme) => {
    //   this.config.theme = theme;
    //   this.refresh();
    // };

    // locales plugin, optional
    this.use(plugins.Locale, {
      path: words,
      storage: this.webix.storage.session,
    });

    webix.event(window, "resize", () => {
			const newSize = size();
			if (newSize != this.config.size){
				this.config.size = newSize;
				this.refresh();
			}
		});

    }

    setTheme(theme) {
      webix.storage.local.put("theme", theme);
      this.config.theme = theme;
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
        theme === "contrast" ?
         "https://cdn.webix.com/edge/skins/dark.css" :
          `https://cdn.webix.com/edge/skins/${theme}.css`;
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
