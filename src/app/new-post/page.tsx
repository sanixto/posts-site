import styles from './page.module.css';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';
import FormSubmit from '@/components/form-submit';

export default function NewPostPage() {
  async function createPost(formData: FormData) {
    'use server';
    const title = formData.get('title')?.toString()!;
    const image = formData.get('image');
    const content = formData.get('content')?.toString()!;

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
      <form action={createPost}>
        <p className={styles["form-control"]}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className={styles["form-control"]}>
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className={styles["form-control"]}>
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className={styles["form-actions"]}>
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
