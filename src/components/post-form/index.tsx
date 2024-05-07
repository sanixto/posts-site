'use client';

import { useFormState } from 'react-dom';
import FormSubmit from '../form-submit';
import styles from './index.module.css';

interface PostFormProps {
  action: (prevState: { errorMessages: string[] }, formData: FormData) => Promise<{ errorMessages: string[] }>,
}

export default function PostForm({ action }: PostFormProps) {
  const [state, formAction] = useFormState(action, {errorMessages: []});
  return (
    <form action={formAction}>
      <p className={styles["form-control"]}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p className={styles["form-control"]}>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
          required
        />
      </p>
      <p className={styles["form-control"]}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <p className={styles["form-actions"]}>
        <FormSubmit />
      </p>
      {state.errorMessages.length > 0 && (
        <ul className={styles["form-errors"]}>
          {state.errorMessages.map(errorMsg => (
            <li key={errorMsg}>{errorMsg}</li>
          ))}
        </ul>
      )}
    </form>
  );
}