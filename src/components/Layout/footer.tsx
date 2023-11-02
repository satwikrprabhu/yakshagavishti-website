import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiLogoInstagram, BiLogoGmail } from 'react-icons/bi'
import { Contact } from "lucide-react";

const Footer = () => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Sponsors", url: "/sponsors" },
    { label: "Achievements", url: "/achievements" },
    { label: "About Us", url: "/about" },
  ];

  const contacts = [
    { label: <BiLogoInstagram />, url: "https://www.instagram.com/kalaa_sangama/" },
    { label: <BiLogoGmail fill="none" strokeWidth={1.5} />, url: "mailto:kalaasangama.nmamit@nitte.edu.in" },
  ]

  const router = useRouter();

  // Need to find the active page...
  const activePaths = links.filter((link) => link.url === router.pathname);
  // Idk to implement, thus doing in alternate hack... Typescript throwing error if directly used links.find()
  const activePath = activePaths[0] ? activePaths[0] : { label: "", url: "" };

  return (
    <div className="border-t-[1px] border-gray-600 bg-gradient-to-br from-primary-100 to-gray-950">
      <div className="relative flex flex-col items-center justify-center overflow-hidden text-xs sm:text-sm md:text-sm xl:text-base gap-10 p-10 max-w-7xl xl:mx-auto">
        <div className="flex flex-col md:flex-row w-full justify-around items-center gap-5 md:gap-20">
          <div className="relative">
            <Link href={'/'}>
              <Image src={'/Cloudinary/home/logo.png'} alt="Logo" className="object-contain object-center w-24 md:w-32 lg:w-36 2xl:w-44" height={100} width={100} />
            </Link>
          </div>
          <div className="flex flex-col justify-start gap-1 md:gap-2">
            {/* <div className="text-base sm:text-base md:text-lg xl:text-xl mb-1 md:mb-2 text-center whitespace-nowrap">Quick Links</div> */}
            <div className="flex md:flex-row justify-center items-center gap-1 md:gap-5 flex-wrap select-none">
              {links.map((link, idx) => {
                return (
                  <>
                    <Link key={idx} className={ "py-2" +
                      activePath?.label === link.label
                        ? "text-secondary-100"
                        : "transition duration-150 ease-linear hover:text-secondary-200"
                      } href={link.url}>
                        {link.label}
                    </Link>
                    {idx !== links.length-1 && <span className="mx-3 py-2">|</span>}  
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-1 md:gap-2 w-24 md:w-32 lg:w-36 2xl:w-44">
            {/* <div className="text-sm sm:text-base md:text-lg xl:text-xl mb-1 md:mb-2">Follow On</div> */}
            <ul className="flex flex-row justify-center text-lg sm:text-xl md:text-2xl xl:text-3xl gap-4 md:gap-5">
              {contacts.map((contact, idx) => {
                return (                
                    <Link key={idx} href={contact.url} className="text-white hover:text-secondary-200 transition duration-150 ease-linear">{contact.label}</Link>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="text-xs sm:text-sm md:text-base xl:text-lg text-center flex flex-col gap-2">
          <Link href={"/team"} className="transition-all hover:tracking-widest text-gray-300 underline-offset-4">Made with ❤️ by <span className="text-secondary-100 font-medium">Finite Loop Club</span></Link>
          <div className="">
            © <span className="text-secondary-100 font-medium">Kalaasangama</span> 2023
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
