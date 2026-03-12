import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import BlogPostSection from "@/components/sections/BlogPostSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Amplitude Ventures`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <BlogPostSection post={post} />
      <FooterCta />
      <Footer />
    </main>
  );
}
