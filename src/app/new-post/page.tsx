import { redirect } from 'next/navigation';

import { storePost } from '@/lib/posts';
import PostForm from '@/components/post-form';

export default function NewPostPage() {
  async function createPost(prevState: { errorMessages: string[] }, formData: FormData): Promise<{ errorMessages: string[] }> {
    'use server';
    const title: string = formData.get('title')?.toString()!;
    const image: File = formData.get('image') as File;
    const content: string = formData.get('content')?.toString()!;

    const errorMessages: string[] = [];

    if (!title || title.trim().length === 0) {
      errorMessages.push('Title is required.')
    }

    if (!content || content.trim().length === 0) {
      errorMessages.push('Content is required.')
    }

    if (!image || image.size === 0) {
      errorMessages.push('Image is required.')
    }

    if (errorMessages.length > 0) return { errorMessages };

    storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    });

    redirect('/feed');
  }
  return (
    <>
      <h1>Create a new post</h1>
      <PostForm action={createPost} />
    </>
  );
}
