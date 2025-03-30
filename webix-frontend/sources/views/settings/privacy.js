import { JetView } from "webix-jet";


function saveSettings(formId) {
    const form = $$(formId);
    if (form.validate()) {
        const values = form.getValues();
        webix.message("Saved: " + JSON.stringify(values));
    }
}

const privacySettings = {
    view: "form",
    id: "privacyForm",
    elements: [
        { view: "switch", label: "Profile Visibility", name: "profile_visibility" },
        { view: "switch", label: "Data Sharing", name: "data_sharing" },
        { view: "button", value: "Save", click: function() { saveSettings("privacyForm"); }},
        {}
    ]
};


export default class PrivacyView extends JetView {
    config(){
        return {
            template: "Privacy settings",
            type: "space",
            rows: [
                privacySettings
            ]
        };
    }
}