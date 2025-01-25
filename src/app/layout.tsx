import "@/ui/globals.css";
import { geistSans } from "@/ui/fonts";
import type { Metadata } from "next";
import Link from "next/link";
import SignOutButton from "@/ui/sign-out-button";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "unbAIsed",
  description: "Read unbiased and objective news articles made by analyzing multiple sources.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  console.log(session);

  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-background text-foreground h-screen antialiased`}>
        <header>
          <nav className="mx-auto max-w-screen-xl p-4">
            <ul className="flex justify-between">
              <li>
                <Link href={session ? "/admin" : "/"} className="font-bold">
                  unbAIsed
                </Link>
              </li>
              {session && (
                // Show button if user is logged in
                <li>
                  <SignOutButton />
                </li>
              )}
            </ul>
          </nav>
        </header>
        <main className="mx-auto max-w-screen-xl p-4">{children}</main>
      </body>
    </html>
  );
}
