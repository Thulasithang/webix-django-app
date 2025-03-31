export const loginView = () => {
  // const validate

  const doLogin = () => {
    let form = $$("loginView");
    console.log("form", form);
    if (!form.validate()) {
      webix.message({
        type: "error",
        text: "Please fill in all required fields",
      });
    } else {
      let values = form.getValues();
      webix
        .ajax()
        .headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        })
        .post(
          "http://localhost:8000/api/users/login/",
          JSON.stringify({
            username: values.username,
            password: values.password,
          })
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("data", data.status);
          if (data.token) {
            webix.message("Login successful!");
            webix.storage.local.put("user", {
              id: data.user_preferences.user,
              username: values.username,
              email: data.user.email,
              first_name: data.user.first_name,
              last_name: data.user.last_name,
              token: data.token,
            });
            webix.storage.local.put("user_preferences", {
              theme:
                data.user_preferences.theme === "dark" ||
                data.user_preferences.theme === "webix_dark"
                  ? "webix_dark"
                  : "webix_light",
              email_notifications: data.user_preferences.email_notifications,
              push_notifications: data.user_preferences.push_notifications,
              notification_frequency:
                data.user_preferences.notification_frequency,
              font_style: data.user_preferences.font_style,
              font_size: data.user_preferences.font_size,
              language: data.user_preferences.language,
            });
            window.location.replace("#!/top/dash");
            // this.app.refresh(); // Refresh the app to reflect login status
          } else {
            webix.message({ type: "error", text: "Invalid credentials" });
          }
        })
        .catch((error) => {
          console.error("Error:", error.response);
          if (error.response) {
            let message = JSON.parse(error.response);
            webix.message({ type: "error", text: message.error });
          } else {
          webix.message({ type: "error", text: "Login Failed, try again later" });
          }
        });
    }
  };

  return {
    view: "form",
    id: "loginView",
    // padding: 20,
    width: 400,
    autoWidth: true,
    responsive: true,
    fillspace: true,
    css: "webix_login_form",
    rules: {
      $all: webix.rules.isNotEmpty,
    },
    elementsConfig: {
      labelWidth: 200,
      labelAlign: "left",
      labelPosition: "top",
      labelHeight: 100,
      css: { fontSize: "24px !important", color: "#fff" },
    },
    // on: {
    //   onAfterValidation: function (result, value) {
    //     if (!result) {
    //       var text = [];
    //       for (var key in value) {
    //         if (key == "username") text.push("Login can't be empty");
    //         if (key == "password") text.push("Password can't be empty");
    //       }
    //       webix.message({ type: "error", text: text.join("<br>") });
    //     }
    //   },
    // },
    elements: [
      {
        view: "icon",
        icon: "mdi mdi-close",
        align: "right",
        click: () => window.location.replace("#!/top/dash"),
      },
      {
        // view: "label",
        view: "text",
        label: "Username",
        name: "username",
        required: true,
      },
      {
        view: "text",
        label: "Password",
        type: "password",
        name: "password",
        required: true,
      },
      {
        margin: 10,
        cols: [
          {
            view: "button",
            value: "Login",
            css: "webix_primary",
            click: () => {
              console.log("login clicked");
              doLogin();
            },
          },
        ],
      },
      {
        template: "<a href='#' class='forgot-password'>Forgot password?</a>",
        borderless: true,
        autoheight: true,
        css: "forgot-link",
      },
      {
        cols: [
          { view: "label", label: "Don't have an account?", width: 200, css: "responsive-text" },
          {
            view: "button",
            value: "Sign Up",
            click: () => {
              $$("dataMultiview").setValue("signupView");
            },
          },
        ],
      },
    ],
  };
};
