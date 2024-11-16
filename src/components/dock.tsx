"use client";
import { cn } from "@/lib/utils";
import { Calendar, Images, LucideIcon, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DockItemProps {
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  url: string;
}

const Dock = () => {
  const [visible, setVisible] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  const dockItems: DockItemProps[] = [
    {
      label: "Events",
      icon: Calendar,
      disabled: false,
      url: "/events",
    },
    {
      label: "Gallery",
      icon: Images,
      disabled: false,
      url: "/gallery",
    },
    {
      label: "Members",
      icon: Users,
      disabled: false,
      url: "/members",
    },
    {
      label: "Profile",
      icon: User,
      disabled: false,
      url: "/profile",
    },
  ];

  useEffect(() => {
    // Check if the screen width is less than 768px (mobile)
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < scrollY) {
        setVisible(true); // Show dock when scrolling up
      } else {
        setVisible(false); // Hide dock when scrolling down
      }
      setScrollY(currentScrollY);
    };

    // Only add the scroll event listener if the device is mobile
    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollY, isMobile]);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="fixed bottom-0 md:p-3 left-0 w-full h-14 md:mb-0 mb-3 md:h-20 flex justify-center items-center "
    >
      <div
        className={cn(
          "border flex justify-center items-center rounded-lg relative bg-white/5 backdrop-blur-md h-full w-fit max-w-full transition-transform duration-300 ease-in-out transform md:max-w-1/3",
          visible ? "translate-y-0" : "translate-y-full"
        )}
      >
        {dockItems.map((item) => {
          const isActive = pathname.includes(item.url);
          return (
            <Link
              href={item.url}
              key={item.url}
              className="aspect-square cursor-pointer flex justify-center items-center relative h-full"
            >
              <div
                className={cn(
                  "p-2 rounded-md hover:bg-white/10 transition duration-100",
                  isActive && "bg-white/10 text-green-200"
                )}
              >
                {<item.icon />}
              </div>
              <div
                className={cn(
                  "absolute bottom-0 left-50 bg-green-500 h-0.5 w-1/2 scale-x-0 transition-transform duration-200 ease-in-out transform",
                  isActive && "scale-x-100"
                )}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
