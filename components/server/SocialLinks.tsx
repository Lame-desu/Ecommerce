import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

function SocialLinks() {
  return (
    <div className="pb-4">
      <div className="py-15 border-[0.5px] border-b-gray-300 flex justify-center items-center">
        <div className="flex text-3xl justify-center items-center gap-6">
          <div className="hover:transform-[scaleY(1.1)_scaleX(1.1)] hover:cursor-pointer">
            <FaInstagram />
          </div>
          <div className="hover:transform-[scaleY(1.1)_scaleX(1.1)] hover:cursor-pointer">
            <FaTiktok />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
