import { getBusinessDetail } from '@/app/_libs/microcms';
import styles from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const data = await getBusinessDetail(params.id);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        {data.image && (
          <div className={styles.heroImage}>
            <Image
              src={data.image.url}
              alt={data.description}
              width={1200}
              height={600}
            />
          </div>
        )}
      </section>

      <section className={styles.content}>
        <h1 className={styles.title}>{data.description}</h1>

        {data.logo && (
          <div className={styles.logo}>
            <Image
              src={data.logo.url}
              alt="logo"
              width={200}
              height={200}
            />
          </div>
        )}

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />

        {data.link && (
          <div className={styles.linkWrapper}>
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              詳しくはこちら
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
