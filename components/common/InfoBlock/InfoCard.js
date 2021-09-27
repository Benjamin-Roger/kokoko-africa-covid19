import InfoBlock from "@/components/common/InfoBlock/InfoBlock";
import CardWrapper from "@/components/common/InfoBlock/CardWrapper";

const InfoCard = ({
  data,
  block,
  lastUpdate,
  missingDataDisclaimer,
  children,
}) => {


  return (
    <CardWrapper>
      {data !== undefined ? (
        <InfoBlock
          key={block.type}
          type={block.type}
          {...data}
          title={block.title}
          lastUpdate={lastUpdate}
          sources={data.sources}
        >
          {children}
        </InfoBlock>
      ) : (
        <InfoBlock
          key={block.type}
          type={block.type}
          title={block.title}
          sources={[]}
          isEmpty={true}
        >
          {missingDataDisclaimer}
        </InfoBlock>
      )}
    </CardWrapper>
  );
};

export default InfoCard;
