import { Suspense } from 'react';
import { Metadata } from 'next';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import Post from '../interfaces/post.interface';

export const metadata: Metadata = {
  title: 'Latest Posts',
  description: 'Browse our latest posts.',
}

async function LatestPosts() {
  const latestPosts: Post[] = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here&apos;s what you might&apos;ve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
