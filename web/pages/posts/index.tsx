import Link from "next/link";
import { GetStaticProps } from "next";
import client from "lib/client";

const Posts = ({ posts = [] }: any) => {
  return (
    <article>
      <h1>Posts</h1>
      {posts.map((post: any, i: number) => (
        <div key={i}>
          <Link href={`/posts/${post.slug}`}>{post.slug}</Link>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      ))}
    </article>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  return client
    .fetch(
      `//groq
      *[_type == "post"]{
        title,
        "slug": slug.current
      }[0..9]
      `
    )
    .then((posts) => ({ props: { posts } }))
    .catch((e) => ({ props: { posts: null } }));
};

export default Posts;
