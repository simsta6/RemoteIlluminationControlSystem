import "react-i18next";
import en from "../../src/translations/en.json";

declare module "react-i18next" {
    // and extend them!
    interface CustomTypeOptions {
      // custom namespace type if you changed it
      defaultNS: "en";
      // custom resources type
      resources: {
        en: typeof en;
      };
      keySeparator: ":";
    }
  }