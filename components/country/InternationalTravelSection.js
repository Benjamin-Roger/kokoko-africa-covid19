import InfoCard from "@/components/common/InfoBlock/InfoCard";
import InfoBlock from "@/components/common/InfoBlock/InfoBlock";
import CardWrapper from "@/components/common/InfoBlock/CardWrapper";

import Link from "next/link";

import { withTranslation } from "@/libs/i18n";
import { OxCodeToLabels } from "@/libs/OxCGRT";

let OxType = ["entrance"];
let CMSType = ["toDoBefore", "toDoArrival"];

const formalize = (arr, t) =>
  arr.map((item) => {
    return { title: t(`enter.${item}`), type: item };
  });

const InternationalTravelSection = (props) => {
  const { name, dataOxCGRT, dataCMS, t } = props;

  // Data from OxCGRT
  const OxBlocks = formalize(OxType, t);
  const missingDataDisclaimerOx = (
    <p>
      {t("missingDataDisclaimerOx")}
      {name}.
    </p>
  );

  const OxContent = OxBlocks.map((block) => (
    <InfoCard
      key={block.type}
      {...{ block }}
      data={dataOxCGRT.data ? dataOxCGRT.data[block.type] : undefined}
      lastUpdate={dataOxCGRT.date || ""}
      missingDataDisclaimer={missingDataDisclaimerOx}
    >
      {OxCodeToLabels(dataOxCGRT.data, block)}
    </InfoCard>
  ));

  // Data from Contentful CMS
  const CMSBlocks = formalize(CMSType, t);
  const missingDataDisclaimerCMS = (
    <>
      <p>
        {t("missingDataDisclaimerCMS")}
        {name}.
      </p>
    </>
  );

  const CMSContent = dataCMS.found ? (
    CMSBlocks.map((block) => {
      const currentFields = dataCMS.fields.find(
        (dataset) => dataset.type === block.type
      );

      const body = currentFields.body || "";

      return (
        <InfoCard
          key={block.type}
          {...{ block }}
          data={currentFields}
          lastUpdate={dataCMS.updatedAt}
          missingDataDisclaimer={missingDataDisclaimerCMS}
        >
          <>
            {body ? (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: body,
                  }}
                />
              </>
            ) : (
              <p>{t("noRequests")}</p>
            )}
          </>
        </InfoCard>
      );
    })
  ) : (
    <CardWrapper>
      <InfoBlock
        type="toDoBefore"
        title={t("requirements")}
        sources={[]}
        isEmpty={true}
      >
        <p>{t("enter.missingDataDisclaimer")}</p>

        <p className="emphasis">
          <Link href="/contact">
            <a>{t("enter.helpUsOut")}</a>
          </Link>
        </p>
      </InfoBlock>
    </CardWrapper>
  );

  return (
    <section className="my-2">
      <h2>{t("enter.title")}</h2>

      <>
        <div className="flex flex-wrap gap-2 my-4">
          {OxContent}
          {CMSContent}
        </div>

        {dataCMS.found ? (
          <p className="text-sm italic">
            {t("enter.internationalTravelDisclaimer")}
          </p>
        ) : (
          false
        )}
        <p className="text-sm italic">{t("warningDisclaimer")}</p>
      </>
    </section>
  );
};

export default withTranslation("country")(InternationalTravelSection);
