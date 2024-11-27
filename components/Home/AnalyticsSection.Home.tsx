import { Check } from "lucide-react";
import Image from "next/image";

export default function AnalyticsSection() {
  return (
    <section className="px-4 py-16 md:py-24 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold mb-6">
            HOW DOES IT WORK?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect and chat with ease,
            <br />
            anytime, anywhere
          </h2>
          <p className="text-[#282828] max-w-2xl mx-auto">
            Experience seamless communication with our free messaging platform.
            Start meaningful conversations and stay connected with friends,
            family and colleagues instantly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Chat and connect in real-time
            </h3>
            <p className="text-[#282828] mb-8">
              Our platform provides a smooth messaging experience with instant
              delivery and real-time status updates, helping you stay in sync
              with your conversations.
            </p>
            <ul className="space-y-4">
              {[
                "Send messages instantly with real-time delivery status",
                "Share photos, videos and files seamlessly",
                "Stay updated with typing indicators and online status",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-[#8026ce] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#282828]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/chat-onn.png"
                alt="Chat Interface"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute bottom-[-10vh] lg:bottom-[-10vh] left-[-2vh] md:left-[-15vh] lg:left-[-20vh] xl:left-[-15vh] w-[80vw] sm:w-[50vh] lg:w-[70vh] bg-white/95 rounded-lg p-4 shadow-md ">
              <div className="flex items-center gap-3">
                <Image
                  width={70}
                  height={70}
                  src="/harzel heart.jpg"
                  alt="pic1"
                  className="rounded-[100%] "
                ></Image>
                <div>
                  <p className="font-semibold">Hazel Heart</p>
                  <p className="text-sm text-[#282828]">
                    &quot;Supermi makes staying in touch so easy! The instant
                    messaging and real-time features help me connect with
                    everyone effortlessly.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // second feature */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-[12vh] md:[&>*:first-child]:order-last">
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Chat and connect in real-time
            </h3>
            <p className="text-[#282828] mb-8">
              Our platform provides a smooth messaging experience with instant
              delivery and real-time status updates, helping you stay in sync
              with your conversations.
            </p>
            <ul className="space-y-4">
              {[
                "Send messages instantly with real-time delivery status",
                "Share photos, videos and files seamlessly",
                "Stay updated with typing indicators and online status",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-[#8026ce] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#282828]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/chat-onn.png"
                alt="Chat Interface"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div
              className="absolute bottom-[-10vh] lg:bottom-[-10vh] left-[-2vh] lg:left-[20vh] xl:left-[15vh] w-[80vw] sm:w-[50vh]
             lg:w-[70vh] bg-white/95 rounded-lg p-4 shadow-md "
            >
              <div className="flex items-center gap-3">
                <Image
                  width={70}
                  height={70}
                  src="/Mia-Malkova.jpg"
                  alt="pic1"
                  className="rounded-[100%] "
                ></Image>
                <div>
                  <p className="font-semibold">Mia MalKova</p>
                  <p className="text-sm text-[#282828]">
                    &quot;This platform helps me connect with my fans in a
                    professional and appropriate way. The messaging features are
                    great for keeping conversations respectful and maintaining
                    healthy boundaries.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
