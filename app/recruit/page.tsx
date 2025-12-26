import { getRecruitList } from '@/app/_libs/microcms';
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

export const runtime = 'edge';

type Props = {
  searchParams: Promise<{
    dk: string;
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const data = await getRecruitList({
    draftKey: searchParams.dk,
  });
  return (
    <div className={styles.container}>
      <section className={styles.positions}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>募集職種</h2>
          <p className={styles.sectionLead}>
            事業拡大に伴い、以下のポジションで新しい仲間を募集しています。
          </p>
        </div>
        {data.contents.length === 0 ? (
          <p className={styles.empty}>現在公開されている募集はありません。</p>
        ) : (
          <ul className={styles.grid}>
            {data.contents.map((role) => (
              <li key={role.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.roleTitle}>{role.role}</h3>
                  <span className={styles.cardBadge}>New</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardRow}>
                    <p className={styles.cardLabel}>給与</p>
                    <p className={styles.cardValue}>{role.wages}</p>
                  </div>
                  <div className={styles.cardRow}>
                    <p className={styles.cardLabel}>募集人数</p>
                    <p className={styles.cardValue}>{role.limit}</p>
                  </div>
                  <div className={styles.cardRow}>
                    <p className={styles.cardLabel}>勤務時間</p>
                    <p className={styles.cardValue}>{role['working-hours']}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className={styles.footer}>
        <div>
          <h2 className={styles.message}>We are hiring</h2>
          <p>私たちは共にチャレンジする仲間を募集しています。</p>
        </div>
        <ButtonLink href="/contact">エントリーする</ButtonLink>
      </div>
    </div>
  );
}
