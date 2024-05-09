'use client';

import Image from 'next/image';
import { useOptimistic } from 'react';

import styles from './index.module.css';
import { formatDate } from '@/lib/format';
import LikeButton from '../like-icon';
import PostInterface from '@/interfaces/post.interface';
import { togglePostLikeStatus } from '@/actions/posts';

interface PostProps {
  post: PostInterface,
  action: (postId: number) => Promise<void>,
}

function Post({ post, action } : PostProps) {
  console.log(post)
  return (
    <article className={styles.post}>
      <div className={styles.image}>
        <Image src={post.imageUrl} alt={post.title} fill />
      </div>
      <div className={styles.content}>
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? styles.liked : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: PostInterface[]}) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts,
    (prevPosts, updatedPostId: number) => {
      const updatedPostIndex: number = prevPosts.findIndex(post => post.id === updatedPostId);

      if (updatedPostIndex === -1) return prevPosts;

      const updatedPost: PostInterface = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = updatedPost.isLiked ? 0 : 1;
      const newPosts: PostInterface[] = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId: number) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className={styles.posts}>
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
