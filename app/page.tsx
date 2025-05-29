import Navbar from "@/components/Home/Navbar.Home";
import HeroSection from "@/components/Home/HeroSection.Home";
import AnalyticsSection from "@/components/Home/AnalyticsSection.Home";
import FeaturesSection from "@/components/Home/FeaturesSection.Home";
import Footer from "@/components/Home/Footer.Home";
import Image from "next/image";

export default async function Home() {
    return (
        <>
            <main className="bg-white">
                <div
                    style={{
                        background:
                            // "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(254,205,182,1) 15%, rgba(254,208,186,1) 20%, rgba(255,140,202,1) 37%, rgba(254,203,183,.6) 55%, rgba(254,199,180,.8) 64%, rgba(255,132,132,0.72) 72%, rgba(253,200,187,.7) 82%, rgba(253,199,188,.7) 82%, rgba(223,82,255,1) 100%)",
                            // new gradient
                            "linear-gradient(160deg, rgba(139,92,246,1) 0%, rgba(91,35,182,1) 12%, rgba(109,40,217,1) 18%, rgba(67,56,202,1) 35%, rgba(79,70,229,.6) 55%, rgba(99,102,241,.8) 70%, rgba(76,29,149,0.72) 80%, rgba(49,46,129,.7) 90%, rgba(30,27,75,.7) 95%, rgba(15,23,42,1) 100%)",
                    }}
                    className="text-black backdrop-blur-[30px] "
                >
                    <div className="h-[150vh] w-full p-4 overflow-hidden ">
                        <Navbar />
                        <HeroSection />
                        <div className="w-full overflow-hidden mt-[8vh]">
                            <div className="max-w-[60rem] mx-auto bg-[#ffffff] rounded-2xl border-[2px] border-white ">
                                <Image
                                    className="object-cover p-5 rounded-2xl"
                                    src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900844/Chat%20app%C2%A0/38807952-45c1-4434-b039-6ecc7cca41c5.png"
                                    alt="chat-onn.png"
                                    width={1200}
                                    height={800}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[100vh] w-full">
                        <AnalyticsSection />
                        <FeaturesSection />
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    );
}
