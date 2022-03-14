import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

const endpoint = prismic.getEndpoint(process.env.PRISMIC_REPOSITORY_NAME);

export function createClient(req?: unknown) {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  enableAutoPreviews({ req, client });

  return client;
}
