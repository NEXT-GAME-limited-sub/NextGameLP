export const runtime = 'edge'

import styles from './index.module.css'
import ButtonLink from '@/app/_components/ButtonLink'

export default function RecruitPage() {
  return (
    <div className={styles.container}>

      <section className={styles.process}>
        <ol>
          <li className={styles.processItem}>
            <span className={styles.processNumber}>01</span>
            <div>
              <p className={styles.processTitle}>書類選考</p>
              <p className={styles.processText}>
                ご応募内容をもとに選考させていただきます。
              </p>
            </div>
          </li>

          <li className={styles.processItem}>
            <span className={styles.processNumber}>02</span>
            <div>
              <p className={styles.processTitle}>一次面接</p>
              <p className={styles.processText}>
                オンラインまたは対面で面接を行います。
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
  )
}
