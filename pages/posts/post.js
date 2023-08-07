import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>

      <Image
        src="/images/profile.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
    </Layout>
  );
}
