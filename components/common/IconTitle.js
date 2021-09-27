import IconSwitch from "@/components/common/IconSwitch";

const IconTitle = ({ title, type, score, severity, color, labelFunction, isEmpty }) => {
  const iconClasses = `w-12 h-12 rounded flex items-center justify-center 
  ${severity ? "bg-severity-" + severity : ""} 
  ${color ? "bg-" + color : ""} 
  ${isEmpty ? "bg-gray-200" : ""}
  `;

  return (
    <>
      <div className="flex mb-4">
        <div className={iconClasses}>
          <IconSwitch {...{ type, severity }} />
        </div>
        <div className="infoBlock__title ml-2 flex flex-col justify-center">
          <h3 className="mb-0">{title}</h3>

          {severity ? (
            <p className={`text-severity-${severity}`}>
              {score ? `${Math.ceil(score * 100)}% - ` : ""}
              {labelFunction(severity)}
            </p>
          ) : (
            ""
          )}

        </div>
      </div>

      <style jsx>
        {`
          .bg-severity-critical :global(svg path),
          .bg-severity-critical :global(svg circle),
          .bg-severity-critical :global(svg rect),
          .bg-severity-high :global(svg path),
          .bg-severity-high :global(svg circle),
          .bg-severity-high :global(svg rect) {
            fill: white !important;
          }

          .text-severity-critical {
            color: #fff;
          }
        `}
      </style>
    </>
  );
};

export default IconTitle;
