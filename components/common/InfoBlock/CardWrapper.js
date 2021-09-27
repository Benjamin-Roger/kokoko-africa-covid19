const CardWrapper = (props) => {

  return (
  <>
    <div
      className={`cardWrapper lg:bg-ko-blue-300 lg:rounded-lg lg:p-4 h-inherit flex-grow ${
        props.className || "lg:flex-1"
      }`}
    >
      {props.children}
    </div>
    <style jsx>{``}</style>
  </>);
};

export default CardWrapper;
