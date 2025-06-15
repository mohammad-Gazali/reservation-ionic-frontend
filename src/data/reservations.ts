// reservationApi.ts
import {
  ReservationType,
  CancelReservationRequest,
  CancelReservationResponse,
  UserReservationsResponse,
} from '../types/reservations';
import { handleResponse, API_URL } from './config';

/**
 * Get user's reservations across all or specific type(s)
 */
export const getUserReservations = async (
  type?: ReservationType
): Promise<UserReservationsResponse> => {
  const url = new URL(`${API_URL}/api/reservations`);
  if (type) {
    url.searchParams.append('type', type);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<UserReservationsResponse>(response);
};

/**
 * Cancel a reservation by type and ID
 */
export const cancelReservation = async (
  payload: CancelReservationRequest
): Promise<CancelReservationResponse> => {
  const url = `${API_URL}/api/reservations/cancel`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify({
      type: payload.type,
      id: payload.id,
    }),
  });

  return handleResponse<CancelReservationResponse>(response);
};