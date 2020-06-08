import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-eu-central-1.graphcms.com/v2/ckb6wdueo05az01wk5q9daw3y/master'
  );

  const { products } = await graphcms.request(
    `
      { 
        products {
          slug
          name
          image {
            url
          }
        }
      }
    `
  );

  return {
    props: {
      products,
    },
  };
}

export default ({ products }) =>
  products.map(({ slug, name, image }) => (
    
      <>
        <img src={image} alt={name} />
        <Link key={slug} href={`/articles/${slug}`}>
        <a>{name}</a>
        </Link>
      </>
    
  ));