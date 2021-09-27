import InfoCard from "@/components/common/InfoBlock/InfoCard";

import { withTranslation } from "@/libs/i18n";
import {OxCodeToLabels} from "@/libs/OxCGRT";

const OxTypes = ["innerTravel", "localLife"];

const formalize = (arr, t) =>
  arr.map((item) => {
    return { title: t(`localLife.${item}`), type: item };
  });

const LocalLifeSection = (props) => {
  const { name, t, ...otherProps } = props;
  const dataOxCGRT = { ...otherProps };

  const OxBlocks = formalize(OxTypes, t);

  const missingDataDisclaimerOx = (
    <p>
      {t("missingDataDisclaimerOx")} {name}.
    </p>
  );

  return (
    <section className="my-2">
      <h2>{t("localLife.title")}</h2>
      <>
        <div className="flex flex-wrap gap-2">
          {OxBlocks.map((block) => (
            <InfoCard
              key={block.type}
              {...{ block }}
              data={dataOxCGRT.data ? dataOxCGRT.data[block.type] : undefined}
              lastUpdate={dataOxCGRT.date}
              missingDataDisclaimer={missingDataDisclaimerOx}
            >
              {OxCodeToLabels(dataOxCGRT.data, block)}

              {block.type === "innerTravel" ? <p className="text-sm italic">{t('localLife.innerTravelMissingDisclaimer')}</p> : false}
            </InfoCard>
          ))}
        </div>
      </>
    </section>
  );
};

export default withTranslation("country")(LocalLifeSection);
