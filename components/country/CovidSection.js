import ODFASubSection from "./ODFASubSection";
import MeasuresSubSection from "./MeasuresSubSection";

import { withTranslation } from "@/libs/i18n";

const CovidSection = ({ dataODFA, dataAcaps, t }) => (
  <>
    <section>
      <h2>{t("status.situation")}</h2>

      <ODFASubSection {...dataODFA} />
      <MeasuresSubSection {...dataAcaps} />
    </section>
  </>
);

export default withTranslation("country")(CovidSection);
