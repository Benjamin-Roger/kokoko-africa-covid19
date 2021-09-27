import Image from "next/image";

const BackgroundDecoration = () => (
    <>
    <div className=" plane fixed bottom-2 left-2 w-48 h-24 pointer-events-none opacity-20">
        <Image src="/images/plane.svg" layout="fill" className="object-contain" alt="Plane" />
      </div>
      <style jsx>
          {`
          .plane {
              transform:scale(-1,-1);
              z-index:-1;
          }
          `}
      </style>
      </>
)

export default BackgroundDecoration;