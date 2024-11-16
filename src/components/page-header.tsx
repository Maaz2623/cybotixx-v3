"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type HeaderSectionType = {
  heading: string;
  url: string;
  subHeading: string;
};

const PageHeader = () => {
  const pathname = usePathname();

  const headerSection: HeaderSectionType[] = [
    {
      heading: "Events",
      url: "/events",
      subHeading: "Explore Our Events",
    },
    {
      heading: "Gallery",
      url: "/gallery",
      subHeading: "Snapshots Of Inspirations",
    },
    {
      heading: "Members",
      url: "/members",
      subHeading: "Our Team",
    },
    {
      heading: "Profile",
      url: "/profile",
      subHeading: "Manage Your Profile",
    },
  ];

  return (
    <div className="p-2 text-center flex justify-center items-center">
      {headerSection.map((item) => {
        const isActive = pathname.includes(item.url);

        return (
          <AnimatePresence mode="wait" key={item.url}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1 }}
            >
              <div
                key={item.url}
                className={cn("flex-col hidden", isActive && "flex")}
              >
                <h1 className="md:text-4xl font-semibold md:font-bold text-3xl">
                  {item.heading}
                </h1>
                <p className="text-gray-300 text-xs md:text-sm">
                  {item.subHeading}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default PageHeader;
