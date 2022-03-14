import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { LinkTo } from "../../../components/Link";
import { createClient } from "../../../services/prismic";
import styles from "../post.module.scss";

interface PostPreviewProps {
  post: { slug: string; title: string; content: string; updateAt: string };
}

export default function PostPreview({
  post: { slug, title, content, updateAt },
}: PostPreviewProps) {
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      push(`/posts/${slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{title} | André News</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{title}</h1>
          <time>{updateAt}</time>

          <div
            className={`${styles.postContent} ${styles.postContentPreview}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <LinkTo href="/">
              <a>Subscribe now 🤗</a>
            </LinkTo>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = createClient();
  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutes
  };
};
