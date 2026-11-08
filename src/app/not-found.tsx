import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="font-display text-8xl text-sage">404</p>
      <h1 className="h-lg mt-4">This page wandered off.</h1>
      <Link href="/" className="btn btn-dark mt-8">Back home</Link>
    </section>
  );
}
