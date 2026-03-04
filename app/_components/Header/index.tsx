import Menu from '@/app/_components/Menu'
import styles from './index.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>

      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          alt="NEXTGAME"
          width={120}
          height={36}
          priority
        />
      </Link>

      <Menu />

    </header>
  )
}
