/**
 * @fileoverview Simple API Configuration
 * @description Clean and simple API setup for CatiyoChan
 */

// Simple Base URL
export const BASE_URL = 'http://localhost:4000/api/v1/public/user';

export const ROMS_CATEGORIES = `${BASE_URL}/roms-categories`;

export const COMMENT = `${BASE_URL}/comments`;

// API Endpoints
// export const API_ENDPOINTS = {
//   // ROM Categories
//   ROMS_CATEGORIES: '/roms-categories',
//   ROMS_BY_CATEGORY: (slug) => `/roms-categories/${slug}`,
  
//   // Individual Games
//   GAME_BY_ID: (id) => `/games/${id}`,
  
//   // Emulators
//   EMULATORS_CATEGORIES: '/emulators-categories',
//   EMULATORS_BY_CATEGORY: (slug) => `/emulators-categories/${slug}`,
// };

// Simple API function
// export const getApiUrl = (endpoint) => {
//   return `${BASE_URL}${endpoint}`;
// };