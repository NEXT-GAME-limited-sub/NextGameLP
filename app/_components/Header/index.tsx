import Menu from '@/app/_components/Menu';
import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="NEXTGAME"
          width={140}
          height={40}
          priority
        />
      </Link>

      <Menu />
    </header>
  );
}
