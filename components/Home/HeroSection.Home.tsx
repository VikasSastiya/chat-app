"use client";
import { ArrowRightIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "../magicui/AnimatedShinyText";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "../magicui/InteractiveButton";

const HeroSection: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const textToType = "Messaging WebApp";
    
    // Hydration fix
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // Typing animation effect
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedText(textToType.substring(0, index));
            index++;
            if (index > textToType.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const onClick = () => {
        setIsLoading(true);
        router.push("/auth/login");
    };
    
    // Only render AnimatedShinyText after hydration
    if (!isMounted) {
        return (
            <div className="z-10 flex mt-14 items-center justify-center">
                <div className="group rounded-full border border-white/5 bg-neutral-100 text-base text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <div className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 gap-2">
                        <span className="font-semibold">✨ Unlock Conversational Power</span>
                        <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <div className="w-full flex flex-col justify-between items-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="z-10 flex mt-14 items-center justify-center">
                        <div
                            onClick={onClick}
                            className={cn(
                                "group rounded-full border border-white/5 bg-neutral-100 text-base text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                            )}
                        >
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 gap-2">
                                <span className="font-semibold">✨ Unlock Conversational Power</span>
                                <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </AnimatedShinyText>
                        </div>
                    </div>
                </motion.h1>
                
                <div className="text-center mt-5 md:mt-0 flex flex-col justify-between items-center">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="py-12"
                    >
                        <h1 className="font-bold text-[40px] md:text-[65px] text-white leading-tight">
                            Empower Your
                        </h1>
                        <h1 className="font-bold text-[40px] md:text-[65px] text-white leading-tight">
                            Conversations with <br/>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                                Next Gen
                            </span>
                        </h1>
                        <h1 className="font-bold text-[40px] md:text-[65px] bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-fit flex justify-center items-center flex-col"
                    >
                        <h1 className="text-center font-sans font-light text-[20px] md:text-[23px] text-white/90">
                            Unlock seamless communication and streamline your messaging
                        </h1>
                        <h1 className="text-center font-sans font-light text-[20px] md:text-[23px] text-white/90">
                            experience with our innovative platform
                        </h1>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClick}
                            className="mt-8 rounded-full cursor-pointer shadow-lg"
                        >
                            {isLoading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : 
                                <InteractiveHoverButton>
                                    Get Started
                                </InteractiveHoverButton>
                            }
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
