"use client";
import {
    LayoutTemplate,
    FileCode2,
    Palette,
    Database,
    Server,
    KeyRound,
    MessageCircle,
    Smile,
    FileUp,
    Users2,
    Clock,
    Activity,
    CheckCheck,
    UserCircle2,
    Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const features = [
    { icon: LayoutTemplate, text: "Next.js 15" },
    { icon: FileCode2, text: "TypeScript" },
    { icon: Palette, text: "Tailwind CSS" },
    { icon: Database, text: "Prisma ORM" },
    { icon: Server, text: "PostgreSQL Database" },
    { icon: KeyRound, text: "NextAuth Authentication" },
    { icon: MessageCircle, text: "Pusher.js" },
    { icon: Smile, text: "Emoji Support" },
    { icon: FileUp, text: "File Sharing" },
    { icon: Users2, text: "Group Chats" },
    { icon: Clock, text: "Message History" },
    { icon: Activity, text: "Online Status" },
    { icon: CheckCheck, text: "Read Receipts" },
    { icon: UserCircle2, text: "User Profiles" },
    { icon: Bell, text: "Push Notifications" },
];

export default function FeaturesSection() {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    };
    
    return (
        <section className="px-0 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold mb-6 border border-white/20">
                        KEY FEATURES
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Everything You Need,
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                            All in One Place
                        </span>
                    </h2>
                    <p className="text-white/90 max-w-2xl mx-auto mb-8">
                        A powerful messaging platform with all the features you
                        need to stay connected with friends, family and
                        colleagues
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClick}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-purple-900/20 transition-all duration-300"
                    >
                        Start Chatting Now
                    </motion.button>
                </motion.div>
            </div>

            <div className="w-full overflow-hidden py-2 cursor-pointer">
                <div className="relative flex overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap py-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-white/20 mx-4 hover:bg-white/30 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-full">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-white/20 mx-4 hover:bg-white/30 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-full">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex overflow-x-hidden mt-2">
                    <div className="animate-marquee-reverse whitespace-nowrap py-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-white/20 mx-4 hover:bg-white/30 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-full">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2-reverse whitespace-nowrap py-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-white/20 mx-4 hover:bg-white/30 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-full">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex overflow-x-hidden mt-2">
                    <div className="animate-marquee whitespace-nowrap py-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-white/20 mx-4 hover:bg-white/30 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-full">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-white/20 mx-4 hover:bg-white/30 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-full">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
