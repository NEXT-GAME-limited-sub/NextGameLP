import { getRecruitList } from '../_libs/microcms';
import styles from './page.module.css';
import ButtonLink from '../_components/ButtonLink';



export default async function Page(props: any) {
  const searchParams = props?.searchParams;

  let data = { contents: [] as any[] };

  try {
    const draftKey =
      typeof searchParams?.dk === 'string'
        ? searchParams.dk
        : undefined;

    data = await getRecruitList({ draftKey });
  } catch (error) {
    console.error('Failed to fetch recruit list:', error);
  }

  return (
    <div className={styles.container}>
      <section className={styles.positions}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>募集職種</h2>
        </div>

        <ul className={styles.positionList}>
          {data.contents.map((item) => (
            <li key={item.id} className={styles.positionItem}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.process}>
        <h2 className={styles.sectionTitle}>選考フロー</h2>

        <ol className={styles.processList}>
          <li className={styles.processItem}>
            <span className={styles.processNumber}>01</span>
            <div>
              <p className={styles.processTitle}>書類選考</p>
              <p className={styles.processText}>
                ご応募内容をもとに選考を行います。
              </p>
            </div>
          </li>

          <li className={styles.processItem}>
            <span className={styles.processNumber}>02</span>
            <div>
              <p className={styles.processTitle}>一次面接</p>
              <p className={styles.processText}>
                業務内容やスキルについて確認します。
              </p>
            </div>
          </li>

          <li className={styles.processItem}>
            <span className={styles.processNumber}>03</span>
            <div>
              <p className={styles.processTitle}>最終面接</p>
              <p className={styles.processText}>
                ビジョンの共感度とカルチャーフィットを確認します。
              </p>
            </div>
          </li>
        </ol>
      </section>

      <div className={styles.footer}>
        <div>
          <h2 className={styles.message}>We are hiring</h2>
          <p>
            私たちは共にチャレンジする仲間を募集しています。
          </p>
        </div>
        <ButtonLink href="/contact">
          エントリーする
        </ButtonLink>
      </div>
    </div>
  );
}
