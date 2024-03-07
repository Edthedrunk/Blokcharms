import Image from "next/image";
import xIcon from "@/utils/icons/x.svg";
import gitIcon from "@/utils/icons/git.svg";

const Footer = () => {
  return (
    <footer className="w-full flex place-content-center p-3 justify-self-end">
      <div className="flex flex-row justify-center items-center max-w-xs self-center">
        <a
          className="w-100 max-w-12 p-3"
          target="_blank"
          href="https://twitter.com/blokcharms"
        >
          <Image
            src={xIcon}
            alt="x icon"
            sizes="40px"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </a>
       
        <a
          className="w-100 max-w-[52px] p-3"
          target="_blank"
          href="https://github.com/Edthedrunk/Blokcharms"
        >
          <Image
            src={gitIcon}
            alt="github icon"
            width={42}
            height={42}
            style={{ objectFit: "contain" }}
          />
        </a>
        
       
      </div>
    </footer>
  );
};

export default Footer;
