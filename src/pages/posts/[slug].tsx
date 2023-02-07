import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import * as prismicH from '@prismicio/helpers';
import { createClient } from "../../services/prismic";
import styles from "./post.module.scss";
import { Session } from "next-auth";

interface PostProps {
  post: { slug: string; title: string; content: string; updateAt: string };
}

export default function Post({
  post: { slug, title, content, updateAt },
}: PostProps) {
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session: any = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prismic = createClient(req);
  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content),
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
  };
};
