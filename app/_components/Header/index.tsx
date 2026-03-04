import Menu from '@/app/_components/Menu';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.png" className={styles.logo} />

      <Menu />
    </header>
  );
}
