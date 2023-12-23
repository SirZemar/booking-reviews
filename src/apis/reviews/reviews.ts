import { isDevMode } from '@angular/core';

// Production
const BASE_URL = `https://main-image-5mua7tasea-nw.a.run.app`;
export const REVIEW_RATINGS = `${BASE_URL}/reviewRates`;
// export const SCRAPE_REVIEWS = `${BASE_URL}/scrapeReviews`;

// Development
const BASE_URL_DEV = `http://localhost:8080`;
export const REVIEW_RATINGS_DEV = `/reviewRatings`;
// export const SCRAPE_REVIEWS_DEV = `/scrapeReviews`;

export const scrapeReviews = (id: string): string => {
  const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
  const endpoint = `${baseUrl}/apartments/${id}/scrapeReviews`;
  return endpoint;
};
