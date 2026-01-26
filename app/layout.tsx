import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import {ThemeProvider} from "@/components/ThemeProvider";
import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";

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
  description: "Adoptions save lives",
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
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              <div className="min-h-screen">
                  <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                      <div className={`max-w-7xl mx-auto px-4 flex justify-between`}>
                          <div className={`flex items-center justify-between h-16`}>
                              <div className="flex items-center">
                                  Rescued
                              </div>
                          </div>
                            <NavBar />
                            {/*desktopnav*/}
                            {/*mobailnav*/}
                      </div>

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
                  <main className={`py-8`}>
                      <div className="max-w-7xl mx-auto px-4">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                              <div className="hidden lg:block lg:col-span-3">
                                  <p>sidebar</p>
                              </div>
                              <div className="lg:col-span-9">{children}</div>
                          </div>
                      </div>
                  </main>
              </div>

          </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
  );
}
