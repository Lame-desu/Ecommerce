import HeroCarousel from "@/components/client/HeroCarousel";
import Footer from "@/components/server/Footer";
import LinearLoading from "@/components/server/LinearLoading";
import ShowCategories from "@/components/server/ShowCategories";
import SignIn from "@/components/server/SignIn";
import UserInfo from "@/components/server/UserInfo";
import { Suspense } from "react";

function page() {
  return (
    <div>
      <HeroCarousel />
      <div className="flex justify-center items-center">
        <div className="w-[75vw]">
          <Suspense
            fallback={
              <>
                <LinearLoading />
              </>
            }
          >
            <ShowCategories />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default page;
