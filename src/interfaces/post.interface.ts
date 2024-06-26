export default interface Post {
  id: number,
  imageUrl: string,
  title: string,
  content: string,
  createdAt: string,
  userId: number,
  likes: number,
  isLiked: 0 | 1,
}