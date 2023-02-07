import { GetStaticProps } from "next";
import Head from "next/head";
import * as prismicH from '@prismicio/helpers';
import { LinkTo } from "../../components/Link";
import { createClient } from "../../services/prismic";
import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Array<Post>;
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | André News</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(({ slug, title, content, updatedAt }: Post) => (
            <LinkTo href={`/posts/${slug}`} key={slug}>
              <a>
                <time>{updatedAt}</time>
                <strong>{title}</strong>
                <p>{content}</p>
              </a>
            </LinkTo>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  const response = await prismic.getAllByType("post", {
    fetch: ["title", "content"],
    pageSize: 100,
  });

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      content:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
