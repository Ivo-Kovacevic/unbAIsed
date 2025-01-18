export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <nav className="mx-auto max-w-screen-xl p-4">
          <ul className="flex justify-between">
            <li>
              <a href="/" className="font-bold">
                unbAIsed
              </a>
            </li>
            <li>
              <a href="/admin" className="hover:underline">
                Admin Home
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-screen-xl p-4">{children}</main>
    </>
  );
}
