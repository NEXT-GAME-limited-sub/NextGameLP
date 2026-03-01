import Menu from '@/app/_components/Menu'
import styles from './index.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* ロゴ */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="NEXTGAME"
            width={120}
            height={40}
          />
        </Link>

        {/* メニュー */}
        <Menu />

      </div>
    </header>
  )
}
