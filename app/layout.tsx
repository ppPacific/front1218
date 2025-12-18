import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import {ThemeProvider} from "@/components/ThemeProvider";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ModeToggle";
import LightRays from "@/components/LightRays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bubbletea.com",
  description: "Best bubbletea franchise across Asia and Europe",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;

}>) {

  return (
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
          >
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >

          <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
              <SignInButton mode={"modal"}>
                  <Button
                      variant={'outline'}
                      className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer">
                      Sign In
                  </Button>
              </SignInButton>
              <SignUpButton>
                  <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer">
                      Sign Up
                  </Button>
              </SignUpButton>
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
              <ModeToggle />
          </header>
              <div className={"absolute inset-0 top-0 z-[-1] min-h-screen"}>
                  <LightRays
                      raysOrigin="top-center-offset"
                      raysColor="#5dfeca"
                      raysSpeed={0.5}
                      lightSpread={0.9}
                      rayLength={1.4}
                      followMouse={true}
                      mouseInfluence={0.02}
                      noiseAmount={0.0}
                      distortion={0.01}>

                  </LightRays>
              </div>

          {children}
          </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
  );
}
