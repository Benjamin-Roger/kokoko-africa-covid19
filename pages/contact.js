import { SEO } from "@/components/common/SEO";

import { withTranslation } from "@/libs/i18n";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import theme from "@/libs/theme";

import config from "@/config";

function ContactPage({ t }) {
  const styles = {
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: theme.colors["ko-green"][100],
  };

  return (
    <>
      <SEO title="Contact us" />
      <article className="markdown container">
        <h1>{t("contact")}</h1>

        <p className="mb-4 mt-8 w-full md:w-1/2">{t("intro")}</p>

        <form
          action={config.getFormAction}
          method="POST"
          className="w-full md:w-1/2 flex flex-col gap-5"
        >
          <TextField
            style={styles}
            variant="filled"
            type="text"
            name="name"
            label={t("name")}
          />
          <TextField
            style={styles}
            variant="filled"
            type="email"
            name="email"
            label={t("email")}
          />

          <TextField
            style={styles}
            variant="filled"
            label={t("message")}
            name="message"
            multiline
            rows={4}
            defaultValue=""
          />

          <Button
            variant="contained"
            style={{
              background: theme.colors["ko-green"][100],
            }}
            type="submit"
          >
            {t("send")}
          </Button>
        </form>
      </article>
    </>
  );
}

export default withTranslation("contact")(ContactPage);
