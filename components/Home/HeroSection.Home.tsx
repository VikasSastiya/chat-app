"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () => {
    setIsLoading(true);
    router.push("/auth/login");
  };
  return (
    <>
      <div className="w-full flex flex-col justify-between items-center ">
        <h1 className="text-center font-[500] mt-[7vh] text-[17px] bg-white px-3 py-[6px] rounded-[20px] w-fit cursor-pointer ">
          Unlock Conversational Power
        </h1>
        <div className="text-center font-[700] text-[40px] md:text-[55px] font-[cursive] mt-5 md:mt-0 flex flex-col justify-between items-center ">
          <div className="py-12">
            <h1>Empower Your</h1>
            <h1>Conversations with Next Gen</h1>
            <h1>Massasing WebApp</h1>
          </div>
          <div className="h-fit flex justify-center items-center flex-col">
            <h1 className="text-center font-sans font-[300] text-[20px] md:text-[23px]">
              Unlock seamless communication and streamline your messaging{" "}
            </h1>
            <h1 className="text-center font-sans font-[300] text-[20px] md:text-[23px]">
              experience with our innovational webApp
            </h1>
            <button
              onClick={onClick}
              className="w-[10rem] h-10 mt-4 flex justify-center items-center text-center font-sans font-[400] text-[20px] bg-white rounded-[20px] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
