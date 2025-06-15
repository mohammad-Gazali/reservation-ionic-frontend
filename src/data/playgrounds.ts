// playgroundApi.ts
import {
  PlayGround,
  PlayGroundReservation,
  ReservePlayGroundRequest,
  SearchPlaygroundsRequest,
} from '../types/playgrounds';
import { handleResponse, API_URL } from './config';

/**
 * Fetch playgrounds (with optional filters)
 */
export const fetchPlaygrounds = async (
  params: SearchPlaygroundsRequest = {}
): Promise<PlayGround[]> => {
  let url = `${API_URL}/api/playgrounds`;

  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append('search', params.search);
  if (params.sport) queryParams.append('sport', params.sport);

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url);
  return handleResponse<PlayGround[]>(response);
};

/**
 * Reserve a playground
 */
export const reservePlayGround = async (
  payload: ReservePlayGroundRequest
): Promise<{
  message: string;
  reservation: Omit<PlayGroundReservation, 'id'> & { id: number };
  discount_applied: boolean;
  original_price: number;
  final_price: number;
}> => {
  const body = {
    play_ground_id: payload.playGroundId,
    reservation_date: payload.reservationDate,
    reservation_time: payload.reservationTime,
    payment_method: payload.paymentMethod,
    coupon_code: payload.couponCode ?? null,
  };

  const response = await fetch(`${API_URL}/api/playgrounds/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify(body),
  });

  return handleResponse<{
    message: string;
    reservation: Omit<PlayGroundReservation, 'id'> & { id: number };
    discount_applied: boolean;
    original_price: number;
    final_price: number;
  }>(response);
};

/**
 * Get current user's playground reservations
 */
export const getUserPlaygroundReservations = async (): Promise<{
  message: string;
  reservations: PlayGroundReservation[];
}> => {
  const response = await fetch(`${API_URL}/api/playgrounds/reservations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{
    message: string;
    reservations: PlayGroundReservation[];
  }>(response);
};