export const runtime = 'edge';

import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

async function fetchRecruitList(draftKey?: string) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    throw new Error('microCMS env is missing');
  }

  const url = `https://${serviceDomain}.microcms.io/api/v1/recruit${
    draftKey ? ?draftKey=${draftKey} : ''
  }`;

  const res = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': apiKey,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recruit list');
  }

  return res.json();
}

export default async function RecruitPage({ searchParams }: any) {
  const draftKey =
    typeof searchParams?.dk === 'string'
      ? searchParams.dk
      : undefined;

  let data = { contents: [] as any[] };

  try {
    data = await fetchRecruitList(draftKey);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className={styles.container}>
      <section className={styles.positions}>
        <h2>募集職種</h2>

        {data.contents.length === 0 && (
          <p>現在募集中の職種はありません。</p>
        )}

        {data.contents.map((item: any) => (
          <div key={item.id} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ButtonLink href={`/recruit/${item.id}`}>
              詳細を見る
            </ButtonLink>
          </div>
        ))}
      </section>
    </div>
  );
}
