import Navbar from "@/components/Home/Navbar.Home";
import HeroSection from "@/components/Home/HeroSection.Home";
import AnalyticsSection from "@/components/Home/AnalyticsSection.Home";
import FeaturesSection from "@/components/Home/FeaturesSection.Home";
import Footer from "@/components/Home/Footer.Home";
export default async function Home() {
  return (
    <>
      <main className="bg-white">
        <div
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(254,205,182,1) 15%, rgba(254,208,186,1) 20%, rgba(255,140,202,1) 37%, rgba(254,203,183,.6) 55%, rgba(254,199,180,.8) 64%, rgba(255,132,132,0.72) 72%, rgba(253,200,187,.7) 82%, rgba(253,199,188,.7) 82%, rgba(223,82,255,1) 100%)",
          }}
          className="text-black"
        >
          <div className="h-[140vh] w-full p-4 overflow-hidden ">
            <Navbar />
            <HeroSection />
            <div className="w-full overflow-hidden mt-[8vh] ">
              <div className="max-w-[70rem] mx-auto bg-[#ffffff47] rounded-2xl border-[2px] border-white ">
                <img
                  className="object-cover p-5 rounded-2xl "
                  src="./chat-onn.png"
                  alt="chat-onn.png"
                />
              </div>
            </div>
          </div>
          <div className="min-h-[100vh] w-full p-4 ">
            <AnalyticsSection />
            <FeaturesSection />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
