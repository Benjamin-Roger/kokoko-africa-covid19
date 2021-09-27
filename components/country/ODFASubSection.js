import StatsInfoBlock from "@/components/common/InfoBlock/StatsInfoBlock";
import CardWrapper from "@/components/common/InfoBlock/CardWrapper"

import {withTranslation} from '@/libs/i18n'

const ODFASubSection = (props) => {
  const {t, ...otherProps} = props;
  const data = otherProps;

  return (
    <div className="my-5">
      <CardWrapper>
        {data.found === true ? (
          <>
            <StatsInfoBlock
              type="stats"
              title="Situation"
              data={data.values}
              lastUpdate={data.lastUpdate}
              sources={[
                {
                  name: "Open Data for Africa",
                  href: "https://dataportal.opendataforafrica.org/",
                },
              ]}
            />
          </>
        ) : (
        <p>{t("missingDataODFA")}</p>
        )}
      </CardWrapper>
    </div>
  );
};

export default withTranslation('country')(ODFASubSection);
