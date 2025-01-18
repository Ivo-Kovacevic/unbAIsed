import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="mx-auto max-w-screen-xl p-4">
        <article className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Admin Page</h1>
          <Link
            className="rounded-full bg-neutral-900 px-4 py-2 text-white transition-colors hover:bg-neutral-700"
            href="admin/article/create"
          >
            Create article +
          </Link>
        </article>
      </section>
    </>
  );
}
