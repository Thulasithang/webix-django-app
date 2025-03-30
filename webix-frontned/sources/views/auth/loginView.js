export const loginView = () => {

    const doLogin = () => {
        let form = $$("loginView");
        console.log("form", form);
        // if (form.validate()) {
          let values = form.getValues();
        //   if (values.username === "admin" && values.password === "password") {
        //     webix.message("Login successful!");
        //     webix.storage.local.put("user", values.username);
        //     window.location.replace("#!/top/dash");
        //     // this.app.refresh(); // Refresh the app to reflect login status
        //   } else {
        //     webix.message({ type: "error", text: "Invalid credentials" });
        //   }
        
        webix.ajax()
        .headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
        })
        .post("http://localhost:8000/api/users/login/", JSON.stringify({
            username: values.username,
            password: values.password,
        })).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("data", data.status);
            if (data.token) {
                webix.message("Login successful!");
                webix.storage.local.put("user", {
                    username: values.username,
                    token: data.token,
                });
                window.location.replace("#!/top/dash");
                // this.app.refresh(); // Refresh the app to reflect login status
            } else {
                webix.message({ type: "error", text: "Invalid credentials" });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            webix.message({ type: "error", text: "Login failed" });
        });
       
      };

  return {
    view: "form",
    id: "loginView",
    // padding: 20,
    width: 400,
    elements: [
      {
        view: "icon",
        icon: "mdi mdi-close",
        align: "right",
        click: () => window.location.replace("#!/top/dash"),
      },
      { view: "text", label: "Username", name: "username", required: true },
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
          { view: "label", label: "Don't have an account?" },
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
