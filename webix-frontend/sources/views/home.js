import { JetView } from "webix-jet";

export default class HomeView extends JetView {
  config() {
    const size = this.app.config.size;
    console.log("size", size);

    return {
      view: "layout",
      type: "space",
      id: "a1",
      css: "home-container",
      responsive: true,
      // scrollY: true,
      rows: [
        // Hero Section
        {
          responsive: "a1",
          cols: [
            // Left Side: Text Content
            {
              id: "hero-text",
              rows: [
                // { minHeight: 50 },
                {
                  template: "<div class='hero-title'>Welcome to MyApp</div>",
                  css: "fade-in",
                  borderless: true,
                  minHeight: 80,
                },
                {
                  template:
                    "<div class='hero-subtitle'>Your one-stop solution for everything</div>",
                  css: "fade-in",
                  borderless: true,
                  minHeight: 50,
                },
                { minHeight: 20 },
                {
                  // view: "button",
                  // value: "Get Started",
                  // css: "animated-button",
                  click: () => this.show("top/dash"),
                  // borderless: true,
                  // height: 50,
                  view: "button",
                  tooltip: "Ctrl+alt+D",
                  template:
                    "<button class='animated-button' webix_tooltip=\"Ctrl+alt+D\">Get Started</button>",
                  borderless: true,
                  height: 100,
                  minHeight: 80,
                },
                {
                  template: "<div class='hero-subtitle'>Join us today!</div>",
                  css: "fade-in",
                  borderless: true,
                  minHeight: 50,
                },
                {

                }
                // {}
              ],
              padding: 30,
              gravity: 3,
            },
            // {
            //     responsive: true,
            //     minWidth: 10,
            // },

            // Right Side: Hero Image
            {
              // responsive: "a1",
              //   responsiveCell: true,
              template:
                "<img src='https://picsum.photos/seed/picsum/600/400' class='hero-image' />",
              borderless: true,
              width: 600,
              height: 400,
              minWidth: 500,
              css: "fade-in",
            },
          ],
        },

        // Features Section
        {
          type: "wide",
          cols: [
            {
              template: "<div class='feature-card'>🚀 Fast Performance</div>",
              css: "feature",
              borderless: true,
            },
            {
              template: "<div class='feature-card'>🔒 Secure & Reliable</div>",
              css: "feature",
              borderless: true,
            },
            {
              template: "<div class='feature-card'>🌍 Cloud-Based</div>",
              css: "feature",
              borderless: true,
            },
          ],
          minHeight: 150,
        },
      ],
    };
  }
}
