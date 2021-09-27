import IconTitle from "@/components/common/IconTitle";
import MetaBlock from "./MetaBlock";

import { _, withTranslation } from "@/libs/i18n";

const fullLabel = (severity) => {
  switch (severity) {
    case "low":
      return _("country", `severity.default.low`);
    case "medium":
      return _("country", `severity.default.medium`);
    case "high":
      return _("country", `severity.default.high`);
    case "critical":
      return _("country", `severity.default.critical`);
    default:
      return _("country", `severity.default.default`);
  }
};

const InfoBlock = (props) => {
  const innerTravelDisclaimer = (
    <>
      <p className="text-sm italic">
        {props.t('innerTravelMissingDisclaimer')}
      </p>
    </>
  );

  return (
    <>
      <div className="infoBlock lg:my-3">
        <IconTitle {...props} labelFunction={fullLabel} />
        {props.children}
        {props.type === "innerTravel" && !props.isEmpty
          ? innerTravelDisclaimer
          : ""}
        <MetaBlock sources={props.sources} lastUpdate={props.lastUpdate} />
      </div>
    </>
  );
};

export default withTranslation("country")(InfoBlock);
