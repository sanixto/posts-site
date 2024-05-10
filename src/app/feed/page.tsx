import { Metadata } from 'next';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import Post from '../../interfaces/post.interface';

export async function generateMetadata(): Promise<Metadata> {
  const posts: Post[] = await getPosts();
  const numberOfPosts = posts.length;

  return {
    title: 'All Posts',
    description: `Browse all our ${numberOfPosts} posts.`,
  }
}

export default async function FeedPage() {
  const posts: Post[] = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
