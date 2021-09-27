import theme from "@/libs/theme";

import IconSwitch from "@/components/common/IconSwitch";

const HomeCard = ({ title, icon, children }) => (
  <>
    <div className="homecard w-full md:w-72 md:h-72 h-inherit md:min-h-60 flex flex-col justify-center items-center p-6 rounded bg-ko-blue-300 border-l-5 border-ko-blue-100 duration-150">
      <div className="w-16 h-16">
        <IconSwitch type={icon} color="white" />
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>

    <style jsx>{`
      .homecard {
        transform: translate(1px, -1px);
        box-shadow: -1px 1px 0 ${theme.colors["ko-green"][100]};
      }
      .homecard:hover {
        transform: translate(10px, -10px);
        box-shadow: -10px 10px 0 ${theme.colors["ko-green"][100]};
      }
    `}</style>
  </>
);

export default HomeCard;
