import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
  MicroCMSListResponse,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// カテゴリーの型定義
export type Category = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// ニュースの型定義
export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
};

// メンバーの型定義
export type Member = {
  name: string;
  position: string;
  profile: string;
  image?: MicroCMSImage;
};

// 採用情報の型定義
export type Recruit = {
  role: string;
  wages: string;
  limit: string;
  'working-hours': string;
};

// 事業内容の型定義
export type Business = {
  logo?: MicroCMSImage;
  description: string;
  image?: MicroCMSImage;
  link: string;
  content: string;
};

// メタ情報の型定義
export type Meta = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MicroCMSImage;
  canonical?: string;
};

export type Article = News & MicroCMSContentId & MicroCMSDate;

const microcmsServiceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const microcmsApiKey = process.env.MICROCMS_API_KEY;
const isMicroCMSConfigured = Boolean(microcmsServiceDomain && microcmsApiKey);

// Initialize Client SDK.
export const client = isMicroCMSConfigured
  ? createClient({
      serviceDomain: microcmsServiceDomain,
      apiKey: microcmsApiKey,
    })
  : null;

const createEmptyList = <T>(): MicroCMSListResponse<T> => ({
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
});

// ニュース一覧を取得
export const getNewsList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return createEmptyList<News>();
  }
  const listData = await client
    .getList<News>({
      endpoint: 'news',
      queries,
    })
    .catch(notFound);
  return listData;
};

// ニュースの詳細を取得
export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  if (!client) {
    return notFound();
  }
  const detailData = await client
    .getListDetail<News>({
      endpoint: 'news',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

// カテゴリーの一覧を取得
export const getCategoryList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return createEmptyList<Category>();
  }
  const listData = await client
    .getList<Category>({
      endpoint: 'categories',
      queries,
    })
    .catch(notFound);

  return listData;
};

// カテゴリーの詳細を取得
export const getCategoryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  if (!client) {
    return notFound();
  }
  const detailData = await client
    .getListDetail<Category>({
      endpoint: 'categories',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

// メンバー一覧を取得
export const getMembersList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return createEmptyList<Member>();
  }
  const listData = await client
    .getList<Member>({
      endpoint: 'members',
      queries,
    })
    .catch(notFound);
  return listData;
};

// 採用情報一覧を取得
export const getRecruitList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return createEmptyList<Recruit>();
  }
  const listData = await client
    .getList<Recruit>({
      endpoint: 'recruit',
      queries,
    })
    .catch(notFound);
  return listData;
};

// 事業内容一覧を取得
export const getBusinessList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return createEmptyList<Business>();
  }
  const listData = await client
    .getList<Business>({
      endpoint: 'business',
      queries,
    })
    .catch(notFound);
  return listData;
};

// 事業内容の詳細を取得
export const getBusinessDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  if (!client) {
    return notFound();
  }
  const detailData = await client
    .getListDetail<Business>({
      endpoint: 'business',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

// メタ情報を取得
export const getMeta = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return null;
  }
  const data = await client
    .getObject<Meta>({
      endpoint: 'meta',
      queries,
    })
    .catch(() => null);

  return data;
};
