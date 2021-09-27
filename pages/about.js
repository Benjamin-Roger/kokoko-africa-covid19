import { SEO } from "@/components/common/SEO";

export default function AboutPage({locale}) {
  const { attributes, html } = require(`../markdown/about.${locale}.md`);

  return (
    <>
      <SEO title={attributes.title} />
      <article className="markdown container">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { locale } };
}
