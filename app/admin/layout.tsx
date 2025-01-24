import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <nav className="mx-auto max-w-screen-xl p-4">
          <ul className="flex justify-between">
            <li>
              <Link href="/admin" className="font-bold">
                unbAIsed
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:underline">
                Admin Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-screen-xl p-4">{children}</main>
    </>
  );
}
