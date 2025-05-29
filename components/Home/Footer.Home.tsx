"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-white/5 backdrop-blur-md mt-16 py-16 border-t border-white/10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4 text-center md:text-start text-white">
                            MessageHub
                        </h3>
                        <p className="text-white/70 mb-6 hover:text-white transition-all text-center md:text-start">
                            A modern messaging platform built with Next.js,
                            TypeScript, and real-time communications.
                        </p>
                        <div className="flex flex-row justify-center md:justify-start space-x-6">
                            <Link
                                href="https://github.com/ShaileshIshere"
                                className="text-white/70 hover:text-white transition-all hover:scale-110"
                            >
                                <Github className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://x.com/_justshailesh"
                                className="text-white/70 hover:text-white transition-all hover:scale-110"
                            >
                                <Twitter className="w-6 h-6" />
                            </Link>
                            <Link 
                                href="/" 
                                className="text-white/70 hover:text-white transition-all hover:scale-110"
                            >
                                <Linkedin className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-center md:text-start text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-white/70 text-center md:text-start">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-center md:text-start text-white">
                            Support
                        </h4>
                        <ul className="space-y-3 text-white/70 text-center md:text-start">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-white/60 transition-all text-center md:text-start">
                    <p>
                        &copy; {new Date().getFullYear()} MessageHub. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
