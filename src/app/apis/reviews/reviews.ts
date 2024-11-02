import { isDevMode } from '@angular/core';

// Production
const BASE_URL = `https://main-image-5mua7tasea-nw.a.run.app`;

// Development
const BASE_URL_DEV = `http://localhost:8080`;

export const scrapeReviews = (id: string): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments/${id}/scrapeReviews`;
	return endpoint;
};

export const addReviews = (id: string): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments/${id}/reviews/add`;
	return endpoint;
};
