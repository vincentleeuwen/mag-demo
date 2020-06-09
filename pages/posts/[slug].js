import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';
import ReactMarkdown from 'react-markdown/with-html';

import Container from '../../components/Container';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckb6wdueo05az01wk5q9daw3y/master'
);

export async function getStaticProps({ params }) {
  const { post } = await graphcms.request(
    `
    query ProductPageQuery($slug: String!) {
      post(where: { slug: $slug }) {
        slug
        title
        content {
          markdown
        }
        date
        coverImage {
          url
        }
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };

}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(`
    { 
      posts {
        slug
        title
        content {
          markdown
        }
        date
        coverImage {
          url
        }
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default ({ post }) => (
  <Container>
    <Link href="/">
      <a>Home</a>
    </Link>{'  '}/{'  '}<span>{post.title}</span>
    <img src={post.coverImage.url} style={{ maxWidth: '100%', marginTop: '15px'}} />
    <h1>{post.title}</h1>
    <ReactMarkdown 
      source={post.content.markdown}
      escapeHtml={false}
    />
  </Container>
);