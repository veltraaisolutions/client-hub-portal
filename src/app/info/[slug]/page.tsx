import { FOOTER_DATA } from "@/constants/footer-links";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function InfoPage({ params }: any) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  //   console.log("Current Slug:", slug);

  // Flatten the data
  const allLinks = FOOTER_DATA.flatMap((section) => section.links);

  // Find the data
  const pageData = allLinks.find((link) => link.slug === slug);

  // If no match is found, Next.js throws a 404
  if (!pageData) {
    console.log("No data found for slug:", slug);
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="flex items-center text-sm text-zinc-500 mb-12"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        <article className="bg-white p-10 border border-zinc-200 shadow-sm">
          <h1 className="text-4xl font-bold text-[#001a33] mb-8 uppercase">
            {pageData.name}
          </h1>
          <div className="text-xl text-zinc-600 italic mb-6">
            {pageData.content}
          </div>
          <p className="text-zinc-500">
            This is institutional content for Pacific client hub Global. All{" "}
            {pageData.name} information is strictly for professional investors.
          </p>
        </article>
      </div>
    </main>
  );
}
