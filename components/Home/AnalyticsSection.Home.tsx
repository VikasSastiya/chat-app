"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AnalyticsSection() {
    return (
        <section className="px-4 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold mb-6 border border-white/20">
                        HOW DOES IT WORK?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Connect and chat with ease,
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                            anytime, anywhere
                        </span>
                    </h2>
                    <p className="text-white/90 max-w-2xl mx-auto">
                        Experience seamless communication with our powerful
                        messaging platform. Start meaningful conversations and
                        stay connected with friends, family and colleagues
                        instantly.
                    </p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-6 text-white">
                            Chat and connect in real-time
                        </h3>
                        <p className="text-white/80 mb-8">
                            Our platform provides a smooth messaging experience
                            with instant delivery and real-time status updates,
                            helping you stay in sync with your conversations.
                        </p>
                        <ul className="space-y-6">
                            {[
                                "Send messages instantly with real-time delivery status",
                                "Share photos, videos and files seamlessly",
                                "Stay updated with typing indicators and online status",
                            ].map((feature, index) => (
                                <motion.li
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-1 shadow-md shadow-purple-500/20">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90">
                                        {feature}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src="/chat-onn.png"
                                alt="Chat Interface"
                                width={800}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="absolute bottom-[-10vh] lg:bottom-[-10vh] left-[-2vh] md:left-[-15vh] lg:left-[-20vh] xl:left-[-15vh] w-[80vw] sm:w-[50vh] lg:w-[70vh] bg-white/10 backdrop-blur-xl rounded-lg p-4 shadow-xl border border-white/20"
                        >
                            <div className="flex items-center gap-3">
                                <Image
                                    width={70}
                                    height={70}
                                    src="/harzel heart.jpg"
                                    alt="pic1"
                                    className="rounded-full border-2 border-purple-400"
                                />
                                <div>
                                    <p className="font-semibold text-white">Hazel Heart</p>
                                    <p className="text-sm text-white/80">
                                        &quot;MessageHub makes staying in touch so
                                        easy! The instant messaging and
                                        real-time features help me connect with
                                        everyone effortlessly.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Second feature section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mt-[12vh] md:[&>*:first-child]:order-last">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-6 text-white">
                            Stay connected everywhere
                        </h3>
                        <p className="text-white/80 mb-8">
                            Whether you&apos;re at home, work, or on the go, MessageHub keeps
                            you connected with a consistent experience across all your devices.
                        </p>
                        <ul className="space-y-6">
                            {[
                                "Sync conversations across all your devices",
                                "Create private spaces for personal and group chats",
                                "Customize notifications for different conversations"
                            ].map((feature, index) => (
                                <motion.li
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-1 shadow-md shadow-purple-500/20">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90">
                                        {feature}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src="/chat-onn.png"
                                alt="Chat Interface"
                                width={800}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="absolute bottom-[-10vh] lg:bottom-[-10vh] left-[-2vh] lg:left-[20vh] xl:left-[15vh] w-[80vw] sm:w-[50vh] lg:w-[70vh] bg-white/10 backdrop-blur-xl rounded-lg p-4 shadow-xl border border-white/20"
                        >
                            <div className="flex items-center gap-3">
                                <Image
                                    width={70}
                                    height={70}
                                    src="/Mia-Malkova.jpg"
                                    alt="pic1"
                                    className="rounded-full border-2 border-purple-400"
                                />
                                <div>
                                    <p className="font-semibold text-white">Mia MalKova</p>
                                    <p className="text-sm text-white/80">
                                        &quot;This platform helps me connect
                                        with my fans in a professional way. The messaging features
                                        are great for keeping conversations
                                        respectful and maintaining healthy
                                        boundaries.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
