

export const signupView = () => {
    const signup = () => {
        const form = $$("signupView");
        if (form.validate()) {
            const data = form.getValues();
            webix
                .ajax()
                .headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                })
                .post("http://localhost:8000/api/users/signup/", JSON.stringify(
                    {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                    }))
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.status === 201) {
                        webix.message("Sign up successful!");
                        $$("signupView").clear();
                        $$("dataMultiview").setValue("loginView");
                    }
                    else {
                        webix.message({ type: "error", text: "Sign up failed" });
                    }
                })
                .catch((error) => {
                    webix.message({ type: "error", text: "Error signing up" });
                });
        } else {
            webix.message({ type: "error", text: "Please fill all required fields" });
        }
      };
    return {
      id: "signupView",
      localId: "signupView",
      view: "form",
      css: "webix_login_form",
      width: 400,
      // height: 400,
      borderless: true,
      elementsConfig: {
        labelWidth: 200,
      labelAlign: "left",
      labelPosition: "top",
      labelHeight: 100,
      },
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
          label: "Email",
          name: "email",
          type: "email",
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
          view: "button",
          value: "Sign Up",
          css: "webix_primary",
          click: () => signup(),
          hotkey: "enter",
        },
        {
          cols: [
            { view: "label", label: "Already have an account?" },
            {
              view: "button",
              value: "Login",
              click: function () {
                $$("dataMultiview").setValue("loginView");
                // $$("loginView").clear();
                // $$("loginView").show();
              },
              hotkey: "left",
            },
          ],
        },
      ],
    };
  };