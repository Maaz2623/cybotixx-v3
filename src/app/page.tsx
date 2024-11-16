"use client";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";
import { textGenerateWords, typewriterWords } from "@/constants";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderIcon } from "lucide-react";

const HomePage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <section
      id="hero"
      className="flex flex-col justify-start rounded-lg h-screen items-center"
    >
      <div className="w-full h-16 px-2 md:px-4 flex items-center justify-between">
        <div className="flex justify-center items-center">
          <Image
            src={`/cybotix-dark.png`}
            alt="logo"
            width={200}
            height={200}
            className="size-12 md:size-14"
          />
          <p className="text-lg md:text-2xl font-semibold">CYBOTIXX</p>
        </div>
        <SignedIn>
          <div className="md:size-10 size-8">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <Button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              router.push(`/sign-in`);
            }}
            className="w-[80px]"
            variant={`secondary`}
          >
            {loading ? (
              <LoaderIcon className="size-4 animate-spin text-white" />
            ) : (
              "Sign In"
            )}
          </Button>
        </SignedOut>
      </div>
      <div className="h-1/2 flex flex-col mt-[40px] md:mt-[60px] justify-center items-center">
        <TypewriterEffectSmooth
          words={typewriterWords}
          className="text-3xl text-wrap md:text-5xl"
        />
        <TextGenerateEffect
          duration={0.5}
          words={textGenerateWords}
          className="lg:w-1/2 text-center  px-3 font-light text-gray-500 text-sm w-full md:px-6 md:text-lg lg:text-xl"
        />
        <Button
          onClick={() => router.push(`/events`)}
          className="mt-10 bg-primary/50 border border-green-600 cursor-pointer hover:bg-primary/80 flex justify-center items-center gap-2 z-10 text-white"
        >
          <SignedIn>Dashboard</SignedIn>
          <SignedOut>Join the forum</SignedOut>
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
