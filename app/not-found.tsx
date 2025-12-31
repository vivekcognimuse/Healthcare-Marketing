import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-white min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-24">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="typography-h1 text-black mb-4">404</h1>
            <h2 className="typography-h2 text-black mb-6">Page Not Found</h2>
            <p className="typography-p1 text-black/70 mb-8">
              Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="btn-primary typography-btn1 px-8 py-4 transition-all duration-300 text-center"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}

