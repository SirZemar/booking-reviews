import { isDevMode } from '@angular/core';

// Prodcution
const BASE_URL = `https://main-image-5mua7tasea-nw.a.run.app`;

// Development
const BASE_URL_DEV = `http://localhost:8080`;

export const getApartments = (): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments`;
	return endpoint;
};

export const addApartment = (id: string): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments/${id}/add`;
	return endpoint;
};

export const patchApartment = (id: string): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments/${id}/patch`;
	return endpoint;
};

export const deleteApartment = (id: string): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments/${id}/delete`;
	return endpoint;
};

export const getApartmentById = (id: string): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments/${id}`;
	return endpoint;
};
