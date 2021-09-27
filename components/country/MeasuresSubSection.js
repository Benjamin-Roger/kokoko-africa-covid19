import moment from "moment-mini";

import CustomDropDown from "@/components/common/CustomDropDown";
import IconTitle from "@/components/common/IconTitle";
import OutboundLink from "@/components/home/OutboundLink";

import { v4 as uuid } from "uuid";

import { withTranslation } from "@/libs/i18n";

function MeasureContent({ body, implementedDate, source, t }) {
  return (
    <>
      <p>{body}</p>

      <p className="mt-3 text-sm italic">
        {t("measures.implementedOn")}: {moment(implementedDate).format("LL")}
      </p>

      <p className="text-sm italic">
        Sources:{" "}
        <a
          className="underline"
          href={source.link}
          rel="nofollow"
          target="_blank"
        >
          {source.name}
        </a>
      </p>
    </>
  );
}

MeasureContent = withTranslation("country")(MeasureContent);

const MeasuresSubSection = (props) => {
  const {t, ...otherProps} = props;

  const data = otherProps;

  return (
    <div className="my-5">
      <IconTitle
        type="news"
        title={t('status.updatedGovMeas')}
        labelFunction={() => ""}
        color="ko-blue-100"
      />

      {data.results.length ? (
        <>
          {data.results.map((result) => (
            <CustomDropDown
              key={uuid()}
              title={result.title}
              date={result.postDate}
            >
              <>
                <MeasureContent {...result} />
              </>
            </CustomDropDown>
          ))}

          <p className="text-sm italic">
            Source:{" "}
            <OutboundLink href="https://www.acaps.org/covid-19-government-measures-dataset">
              ACAPS
            </OutboundLink>
          </p>
        </>
      ) : (
        <p>{t("missingAcapsDisclaimer")}.</p>
      )}

    </div>
  );
};

export default withTranslation("country")(MeasuresSubSection);
