import React from "react";
import { getAllPostIds, getPostData } from "../../utils/games";
import Head from "next/head";
import Layout from "../../components/layout/layout";
import FormattedDate from '../../components/date/date';

export default function Post({ postData }) {
  return (
    <Layout children={undefined}>
      <Head children={undefined}>
        <title>RPG {postData.title}</title>
      </Head>
      <h1>{postData.title}</h1>
      <h2>id is: {postData.id}</h2>
      <h3>date is: <FormattedDate dateString={postData.date} /></h3>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
