import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm mt-16 py-12  ">
      <div className="max-w-7xl mx-auto px-4  ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-center md:text-start ">Chat-App</h3>
            <p className="text-purple-600 mb-4 hover:text-purple-800  transition-all text-center md:text-start">
              A modern messaging platform built with Next.js, TypeScript, and
              real-time communications.
            </p>
            <div className="flex flex-row justify-center md:justify-start space-x-4">
              <Link
                href="https://github.com/ShaileshIshere"
                className="  transition-all"
              >
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="https://x.com/_justshailesh"
                className="  transition-all"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="/" className="  transition-all">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-center md:text-start">Quick Links</h4>
            <ul className="space-y-2 text-purple-600 text-center md:text-start">
              <li className="">
                <Link
                  href="/"
                  className=" hover:text-purple-500  transition-all inline-block"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className=" hover:text-purple-500  transition-all inline-block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className=" hover:text-purple-500  transition-all inline-block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-center md:text-start">Support</h4>
            <ul className="space-y-2 text-purple-600 text-center md:text-start">
              <li>
                <Link href="/" className="   transition-all inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="   transition-all inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="   transition-all inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#000000e6] mt-12 pt-8 text-black transition-all text-center md:text-start">
          <p>
            &copy; {new Date().getFullYear()} Chat-App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
