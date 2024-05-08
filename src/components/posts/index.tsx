import styles from './index.module.css';
import { formatDate } from '@/lib/format';
import LikeButton from '../like-icon';
import PostInterface from '@/interfaces/post.interface';
import Image from 'next/image';
import { togglePostLikeStatus } from '@/actions/posts';

function Post({ post } : { post: PostInterface }) {
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
              action={togglePostLikeStatus.bind(null, post.id)}
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
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
