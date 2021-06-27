import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import client from "lib/client";
import BlockRenderer from "components/BlockRenderer";

const Post = (props: any) => {
  return (
    <article>
      <h1>Post</h1>
      <BlockRenderer blocks={props.data.body} />
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async (args) => {
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  );
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  return client
    .fetch(
      `//groq
      *[_type == "post" && slug.current == $slug][0]
      `,
      { slug }
    )
    .then((data) => ({ props: { data } }))
    .catch((e) => ({ props: { data: null } }));
};

export default Post;
