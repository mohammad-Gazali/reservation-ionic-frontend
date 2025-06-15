// ratingApi.ts
import {
  RateableType,
  RateRequest,
  EditRatingRequest,
  DeleteRatingRequest,
  RatingsResponse,
  AverageRatingResponse,
} from '../types/ratings';
import { handleResponse, API_URL } from './config';

/**
 * Submit a new rating
 */
export const submitRating = async (
  payload: RateRequest
): Promise<{ message: string; rating: any }> => {
  const response = await fetch(`${API_URL}/api/rating/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify({
      type: payload.type,
      id: payload.id,
      rating: payload.rating,
      comment: payload.comment ?? null,
    }),
  });

  return handleResponse<{ message: string; rating: any }>(response);
};

/**
 * Edit an existing rating
 */
export const editRating = async (
  payload: EditRatingRequest
): Promise<{ message: string; rating: any }> => {
  const response = await fetch(`${API_URL}/api/rating/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify({
      type: payload.type,
      id: payload.id,
      rating: payload.rating,
      comment: payload.comment ?? null,
    }),
  });

  return handleResponse<{ message: string; rating: any }>(response);
};

/**
 * Delete a rating
 */
export const deleteRating = async (
  payload: DeleteRatingRequest
): Promise<{ message: string }> => {
  const url = new URL(`${API_URL}/api/rating/delete`);
  url.searchParams.append('type', payload.type);
  url.searchParams.append('id', String(payload.id));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{ message: string }>(response);
};

/**
 * Get all ratings (average + recent comments)
 */
export const getRatings = async (
  type: RateableType,
  id: number
): Promise<RatingsResponse> => {
  const url = new URL(`${API_URL}/api/rating/rates`);
  url.searchParams.append('type', type);
  url.searchParams.append('id', String(id));

  const response = await fetch(url.toString());

  return handleResponse<RatingsResponse>(response);
};

/**
 * Get average rating only
 */
export const getAverageRating = async (
  type: RateableType,
  id: number
): Promise<AverageRatingResponse> => {
  const url = new URL(`${API_URL}/api/rating/average`);
  url.searchParams.append('type', type);
  url.searchParams.append('id', String(id));

  const response = await fetch(url.toString());

  return handleResponse<AverageRatingResponse>(response);
};