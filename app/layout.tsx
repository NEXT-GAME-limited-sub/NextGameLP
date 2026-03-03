import type { Metadata } from 'next';
import { getMeta } from '@/app/_libs/microcms';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import InitialLoading from '@/app/_components/InitialLoading';
import MotionWrapper from '@/app/_components/MotionWrapper';
import './globals.css';
import styles from './layout.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMeta();

  const defaultTitle = 'NEXTGAME株式会社 | 未来と今を繋げるゲーム';
  const defaultDesc = '愛知県名古屋市のNEXTGAME株式会社です。';

  const baseUrl =
    process.env.BASE_URL ?? 'https://nextgame-limited.com';

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: data?.title ?? defaultTitle,
    description: data?.description ?? defaultDesc,
    icons: {
      icon: [
        { url: '/favicons/favicon.ico' },
        { url: '/favicons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        {
          url: '/favicons/apple-touch-icon.png',
          sizes: '180x180',
        },
      ],
    },
    manifest: '/favicons/manifest.json',
    alternates: {
      canonical: data?.canonical ?? baseUrl,
    },
  };

  // openGraph は安全に追加
  if (data?.ogTitle || data?.ogDescription || data?.ogImage?.url) {
    metadata.openGraph = {
      title: data?.ogTitle ?? defaultTitle,
      description: data?.ogDescription ?? defaultDesc,
      ...(data?.ogImage?.url && {
        images: [{ url: data.ogImage.url }],
      }),
    };
  }

  return metadata;
}

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body className={`${styles.body} loading-active`}>
        <InitialLoading />
        <Header />
        <main className={styles.main}>
          <MotionWrapper>{children}</MotionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}