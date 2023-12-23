import { isDevMode } from '@angular/core';

// Prodcution
const BASE_URL = `http://localhost:8080`;

// Development
const BASE_URL_DEV = `http://localhost:8080`;

export const getApartment = (): string => {
	const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
	const endpoint = `${baseUrl}/apartments`;
	return endpoint;
};

export const addApartment = (id: string): string => {
  const baseUrl = isDevMode() ? BASE_URL_DEV : BASE_URL;
  const endpoint = `${baseUrl}/apartments/${id}/add`;
  return endpoint;
};
