import Link from "next/link";
import SelectLanguage from "../client/SelectLanguage";

function Footer() {
  return (
    <div className="flex justify-center items-center">
      <div className="py-15 w-[75vw]">
        <div className="max-w-fit mb-8">
          <p className="font-normal text-xs mb-3">Language</p>
          <SelectLanguage border={true} />
        </div>
        <p className="text-xs font-light">
          © 2025, Shaba Closet Designed by Kinfolks
        </p>
        <Link href="/privacy-policy">
          <p className="text-xs font-light hover:underline">Privacy policy</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
