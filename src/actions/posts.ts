'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';

interface createPostState {
  errorMessages: string[],
}

export async function createPost(prevState: createPostState, formData: FormData): Promise<createPostState> {
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

  let imageUrl: string;

  try {
    imageUrl = await uploadImage(image);
  } catch (e) {
    throw new Error('Image upload failed, post was not created. Please try again later.');
  }

  storePost({
    imageUrl,
    title,
    content,
    userId: 1
  });

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/feed');
}