import { useRouter } from "next/router";

function tryCatchRequire(namespace, locale) {
  try {
    const data = require(`../locales/${locale}/${namespace}.json`);
    return data;
  } catch {
    const data = {};
    return data;
  }
}

const reducerObject = (accumulator, currentValue) => accumulator[currentValue];

export function _(namespace, stringCode, stringObject) {
  const router = useRouter();

  const { locale, defaultLocale } = router;

  // Get default and current language translations
  const defaultLanguageData = tryCatchRequire(namespace, defaultLocale);
  const currentLanguageData = tryCatchRequire(namespace, locale);

  // Get the translation path
  const stringArr = stringCode.split(".");

  // Get the translation
  let result =
    stringArr?.reduce(reducerObject, currentLanguageData) ||
    stringArr?.reduce(reducerObject, defaultLanguageData) ||
    "";

  // Replace placeholder with the correct values
  if (stringObject && typeof stringObject === "object") {
    let keys = Object.keys(stringObject);

    keys.forEach((key) => {
      const replacer = new RegExp(`{{${key}}}`, "g");

      result = result.replace(replacer, stringObject[key]);
    });
  }

  return result;
}

export function withTranslation(namespace) {
  return (WrappedComponent) => (props) => (
    <WrappedComponent
      {...props}
      t={(stringCode, stringObject) => _(namespace, stringCode, stringObject)}
    />
  );
}
