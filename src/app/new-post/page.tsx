import { Metadata } from 'next';

import { createPost } from '@/actions/posts';
import PostForm from '@/components/post-form';

export const metadata: Metadata = {
  title: 'Add new post',
  description: 'Add new post.',
}

export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <PostForm action={createPost} />
    </>
  );
}
