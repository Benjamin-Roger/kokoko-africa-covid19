import IconTitle from "@/components/common/IconTitle";
import StatsInfoBlockContent from "./StatsInfoBlockContent";

import { _ } from "@/libs/i18n";

const statsLabel = (severity) => {

  switch (severity) {
    case "low":
      return _("country", `severity.stats.low`);
    case "medium":
      return _("country", `severity.stats.medium`);
    case "high":
      return _("country", `severity.stats.high`);
    case "critical":
      return _("country", `severity.stats.critical`);
    default:
      return _("country", `severity.stats.default`);
  }
};

const StatsInfoBlock = (props) => {
  return (
    <>
      <div className="infoBlock lg:my-3">
        <IconTitle {...props} {...props.data} labelFunction={statsLabel} />
        <StatsInfoBlockContent {...props} />
      </div>
    </>
  );
};

export default StatsInfoBlock;
