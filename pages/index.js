import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

import Container from '../components/Container';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-eu-central-1.graphcms.com/v2/ckb6wdueo05az01wk5q9daw3y/master'
  );

  const { posts } = await graphcms.request(
    `
      {
        posts {
          slug
          title
          excerpt
          date
          coverImage {
            url
          }
        }
      }
    `
  );

  return {
    props: {
      posts,
    },
  };
}

const HomePage = ({ posts }) => (
  <Container>
    {
      posts.map(({ title, excerpt, slug, date, coverImage }) => (
        <div key={slug} style={{ marginBottom: 45 }}>
          {
            coverImage && (
              <Link key={slug} href={`/posts/${slug}`}>
                <img src={coverImage.url} style={{ height: 75, cursor: 'pointer' }} />
              </Link>
            ) 
          }
          <h3>{title}</h3>
          <p>{date}</p>
          <p>{excerpt}</p>
          <Link key={slug} href={`/posts/${slug}`}>
            <a>Read more</a>
          </Link>
        </div>
      ))
    }
  </Container>
)
 

export default HomePage