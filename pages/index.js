import Head from "next/head";
import Layout, { siteTitle } from "../components/layout/layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.headingMd}>
        <p>
          Hello! Some info about me: - I have a great experience in HTML-coding
          (4+ years) - I have a little experience in Angular 5+ (work with this
          framework on my last workplace) - I was be a part of small startup and
          create frontend on Vanilla React - I have a some experience in UI/UX
          Design More in CV.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
