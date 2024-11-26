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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    <section className="px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold mb-6">
            KEY FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need,
            <br />
            All in One Place
          </h2>
          <p className="text-black max-w-2xl mx-auto mb-8">
            A powerful messaging platform with all the features you need to stay
            connected with friends, family and colleagues
          </p>
          <Button
            onClick={onClick}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700  text-white"
          >
            Start Chatting Now
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium whitespace-nowrap">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
