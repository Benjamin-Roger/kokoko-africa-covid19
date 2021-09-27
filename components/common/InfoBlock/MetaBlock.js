import { v4 as uuid } from "uuid";
import moment from "moment-mini";

import {withTranslation} from '@/libs/i18n'

const MetaBlock = ({ sources, lastUpdate, t }) => {
  const sourcesString = sources
    ? sources.map((source, key) => (
        <span key={uuid()}>
          <a target="_blank" className="underline" href={source.href} rel="nofollow">
            {source.name}
          </a>
          {key + 1 < sources.length ? ", " : ""}
        </span>
      ))
    : "";


  return (
    <>
      {sources.length ? (
        <p className="mt-3 text-sm italic">Source: {sourcesString}</p>
      ) : (
        ""
      )}
      {lastUpdate ? <p className="mt-1 text-sm italic">{t('lastUpdate')}: {moment(lastUpdate).format("DD\/MM\/YYYY")}</p> : ""}
    </>
  );
};

export default withTranslation('country')(MetaBlock);
