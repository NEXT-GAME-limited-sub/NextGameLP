import { notFound } from 'next/navigation';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('microCMS env missing');
}

async function fetchMicroCMS(endpoint: string, query?: string) {
  const url = https://${serviceDomain}.microcms.io/api/v1/${endpoint}${query ?? ''};

  const res = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': apiKey,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

/* ===============================
   Recruit
================================ */
export const getRecruitList = async (draftKey?: string) => {
  return fetchMicroCMS(
    'recruit',
    draftKey ? ?draftKey=${draftKey} : ''
  );
};

/* ===============================
   News
================================ */
export const getNewsList = async () => {
  return fetchMicroCMS('news');
};

export const getNewsDetail = async (id: string) => {
  return fetchMicroCMS(`news/${id}`);
};

/* ===============================
   Business
================================ */
export const getBusinessList = async () => {
  return fetchMicroCMS('business');
};

export const getBusinessDetail = async (id: string) => {
  return fetchMicroCMS(`business/${id}`);
};

/* ===============================
   Members
================================ */
export const getMembersList = async () => {
  return fetchMicroCMS('members');
};

/* ===============================
   Category
================================ */
export const getCategoryList = async () => {
  return fetchMicroCMS('categories');
};

export const getCategoryDetail = async (id: string) => {
  return fetchMicroCMS(`categories/${id}`);
};

/* ===============================
   Meta
================================ */
export const getMeta = async () => {
  return fetchMicroCMS('meta');
};
