import Image from "next/image";
import Link from "next/link";

import config from "@/config";

const Logo = (props) => (
  <div className={`w-32 m-1 ${props.className}`}>
    <Link href="/" alt={config.name}>
      <a className="h-full" alt={config.name}>
        <div className={`relative w-full h-full`}>
          <Image
            src="/images/logo_long.png"
            alt={config.name}
            title={config.name}
            sizes="100px"
            layout="fill"
            className="object-contain"
          />
        </div>
      </a>
    </Link>
  </div>
);

export default Logo;
