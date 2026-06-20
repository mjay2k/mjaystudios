import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site } from '@/data/ja/site';
import {
  getAllPosts,
  getPostBySlug,
  formatPostDate,
  type Block,
} from '@/lib/ja/posts';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post not found — Jesus Anoints Ministries' };
  return {
    title: `${post.title} — Jesus Anoints Ministries`,
    description: post.excerpt,
  };
}

function BlockRenderer({ block }: { block: Block }) {
  if (block.kind === 'h2') {
    return (
      <h2 className="ja-serif mt-12 text-3xl font-medium leading-snug md:text-4xl">
        {block.text}
      </h2>
    );
  }
  if (block.kind === 'quote') {
    return (
      <figure className="my-10 border-l-2 pl-6" style={{ borderColor: 'var(--ja-gold-1)' }}>
        <blockquote className="ja-serif text-2xl font-light italic leading-snug md:text-3xl" style={{ color: 'var(--ja-paper)' }}>
          “{block.text}”
        </blockquote>
        {block.cite && (
          <figcaption
            className="ja-sans mt-3 text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: 'var(--ja-gold-2)' }}
          >
            {block.cite}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <p className="ja-sans mt-6 text-[1.05rem] leading-[1.85] text-white/75">
      {block.text}
    </p>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main
      className="ja-grain relative min-h-screen overflow-hidden"
      style={{ background: 'var(--ja-slate-grad)', color: 'var(--ja-paper)' }}
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.12), transparent 70%)' }}
      />

      {/* top bar */}
      <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/jaministries/blog" aria-label="All posts">
          <Image
            src={site.brand.logoHorizontalRev}
            alt="Jesus Anoints Ministries"
            width={167}
            height={50}
            className="h-14 w-auto md:h-16"
            priority
          />
        </Link>
        <Link
          href="/jaministries/blog"
          className="ja-sans rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[color:var(--ja-gold-2)]"
        >
          ← All posts
        </Link>
      </header>

      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-8">
        {/* header */}
        <div className="ja-rise">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="ja-sans rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ background: 'var(--ja-gold-grad)', color: 'var(--ja-ink-900)' }}
            >
              {post.tag}
            </span>
            <span className="ja-sans text-[11px] uppercase tracking-[0.2em] text-white/45">
              {formatPostDate(post.date)} · {post.readingMinutes} min read
            </span>
          </div>
          <h1 className="ja-serif text-4xl font-light leading-[1.08] md:text-6xl">
            {post.title}
          </h1>
          <p className="ja-sans mt-5 text-lg leading-relaxed text-white/65">
            {post.excerpt}
          </p>
          <p className="ja-sans mt-6 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
            {post.author}
          </p>
        </div>

        {/* cover */}
        {post.cover && (
          <div className="ja-rise relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(44,51,63,0.4))' }} />
          </div>
        )}

        {/* body */}
        <div className="ja-fade mt-12">
          {post.body.map((b, i) => (
            <BlockRenderer key={i} block={b} />
          ))}
        </div>

        {/* footer rule */}
        <div className="ja-gold-rule mt-16 w-full" />
        <p className="ja-sans mt-6 text-center text-sm italic text-white/50">
          {site.tagline}
        </p>
      </article>

      {/* more posts */}
      {more.length > 0 && (
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
          <p className="ja-sans mb-6 text-center text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-2)' }}>
            Continue reading
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/jaministries/blog/${p.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/40 hover:bg-white/[0.05]"
              >
                <span className="ja-sans text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {p.tag} · {formatPostDate(p.date)}
                </span>
                <h3 className="ja-serif mt-2 text-2xl font-medium leading-snug transition-colors group-hover:text-[color:var(--ja-gold-2)]">
                  {p.title}
                </h3>
                <p className="ja-sans mt-3 text-sm leading-relaxed text-white/60">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
