import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import Post from '../interfaces/post.interface';

export default async function FeedPage() {
  const posts: Post[] = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
