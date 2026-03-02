import type { MicroCMSImage, MicroCMSDate, MicroCMSContentId } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

/* ===============================
   型定義
================================ */

export type Category = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSContentId &
  MicroCMSDate;

export type Member = {
  name: string;
  position: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

export type Recruit = {
  role: string;
  wages: string;
  limit: string;
  'working-hours': string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Business = {
  logo?: MicroCMSImage;
  description: string;
  image?: MicroCMSImage;
  link: string;
  content: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Meta = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MicroCMSImage;
  canonical?: string;
};

/* ===============================
   環境変数チェック
================================ */

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

const BASE_URL = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1`;

const headers = {
  'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY!,
};

/* ===============================
   共通fetch
================================ */

async function fetchMicroCMS<T>(endpoint: string, query = ''): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}${query}`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

/* ===============================
   News
================================ */

export const getNewsList = async () => {
  return fetchMicroCMS<{ contents: News[] }>('news');
};

export const getNewsDetail = async (contentId: string) => {
  return fetchMicroCMS<News>(`news/${contentId}`);
};

/* ===============================
   Category
================================ */

export const getCategoryList = async () => {
  return fetchMicroCMS<{ contents: Category[] }>('categories');
};

export const getCategoryDetail = async (contentId: string) => {
  return fetchMicroCMS<Category>(`categories/${contentId}`);
};

/* ===============================
   Members
================================ */

export const getMembersList = async () => {
  return fetchMicroCMS<{ contents: Member[] }>('members');
};

/* ===============================
   Recruit
================================ */

export const getRecruitList = async (params?: { draftKey?: string }) => {
  const query = params?.draftKey ? `?draftKey=${params.draftKey}` : '';
  return fetchMicroCMS<{ contents: Recruit[] }>('recruit', query);
};

/* ===============================
   Business
================================ */

export const getBusinessList = async () => {
  return fetchMicroCMS<{ contents: Business[] }>('business');
};

export const getBusinessDetail = async (contentId: string) => {
  return fetchMicroCMS<Business>(`business/${contentId}`);
};

/* ===============================
   Meta
================================ */

export const getMeta = async () => {
  try {
    return await fetchMicroCMS<Meta>('meta');
  } catch {
    return null;
  }
};
