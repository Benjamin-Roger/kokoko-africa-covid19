import CircularStat from "@/components/common/CircularStat";
import MetaBlock from "./MetaBlock";


import PeopleIcon from '@material-ui/icons/People';

import {withTranslation} from "@/libs/i18n";

const StatsInfoBlockContent = ({ data, sources, lastUpdate, t }) => {
  const { confirmedCases, confirmedDeaths, totalPopulation } = data;
  const infectionRate = confirmedCases / totalPopulation;
  const mortalityRate = confirmedDeaths / confirmedCases;

  let abbrTotalPopulation = '';
  if (totalPopulation > 1000000) abbrTotalPopulation = (totalPopulation/1000000).toFixed(1) + "M";

  return (
    <>
      <div className="grid md:grid-cols-2">
        <div>
          <div className="flex items-center mb-3">
            <div className="h-16 w-16 mr-4">
              <CircularStat text={confirmedCases} percentage={infectionRate} />{" "}
            </div>
            <p>{t('status.confirmedCases')}</p>
          </div>
          <div className="flex items-center  my-3">
            <div className="h-16 w-16  mr-4">
              <CircularStat text={confirmedDeaths} percentage={mortalityRate} />{" "}
            </div>
            <p>{t('status.confirmedDeaths')}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <div className="relative w-24 h-16 flex items-center justify-center mr-4">
              <div className="groupIconWrapper absolute w-full h-full">
                <PeopleIcon style={{height:'100%',width:"100%"}} />
              </div>
              <strong className="text-2xl">{abbrTotalPopulation}</strong>
            </div>
            <p>{t('status.inhabitants')}</p>
          </div>
          <MetaBlock sources={sources} lastUpdate={lastUpdate} />
        </div>
      </div>
      <style jsx>
        {`
          .groupIconWrapper :global(svg path) {
            fill-opacity: 30%;
          }
        `}
      </style>
    </>
  );
};

export default withTranslation('country')(StatsInfoBlockContent);
