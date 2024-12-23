import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/components/convex-client-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cybotixx",
  description:
    "Discover a dynamic platform where ideas, creativity, and innovation converge. Cybotixx offers a vibrant community experience, connecting you to insights, discussions, and inspirations like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" sizes="any" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
        >
          {/* <Image
            src={`/cybotix-dark.png`}
            alt="background"
            height={500}
            width={500}
            className="aspect-square opacity-5 blur-[3px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
          /> */}

          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <ConvexClientProvider>
              {children}
              <Toaster />
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
