// tourApi.ts
import {
  Tour,
  TourReservation,
  TourStop,
  ReserveTourRequest,
  SearchToursRequest,
} from '../types/tours';
import { handleResponse, API_URL } from './config';

/**
 * Fetch tours (with optional search)
 */
export const fetchTours = async (
  params: SearchToursRequest = {}
): Promise<Tour[]> => {
  let url = `${API_URL}/api/tours`;

  if (params.search) {
    url += `?search=${encodeURIComponent(params.search)}`;
  }

  const response = await fetch(url);
  return handleResponse<Tour[]>(response);
};

/**
 * Get stops of a specific tour
 */
export const fetchTourStops = async (
  tourId: number
): Promise<{
  tour_id: number;
  ar_title: string;
  en_title: string;
  stops: TourStop[];
}> => {
  const response = await fetch(`${API_URL}/api/tours/stops?tour_id=${tourId}`);
  return handleResponse<{
    tour_id: number;
    ar_title: string;
    en_title: string;
    stops: TourStop[];
  }>(response);
};

/**
 * Reserve a tour
 */
export const reserveTour = async (
  payload: ReserveTourRequest
): Promise<{
  message: string;
  reservation: Omit<TourReservation, 'id'> & { id: number };
  discount_applied: boolean;
  original_price: number;
  final_price: number;
}> => {
  const body = {
    tour_id: payload.tourId,
    guests: payload.guests,
    payment_method: payload.paymentMethod,
    coupon_code: payload.couponCode ?? null,
  };

  const response = await fetch(`${API_URL}/api/tours/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify(body),
  });

  return handleResponse<{
    message: string;
    reservation: Omit<TourReservation, 'id'> & { id: number };
    discount_applied: boolean;
    original_price: number;
    final_price: number;
  }>(response);
};

/**
 * Get current user's tour reservations
 */
export const getUserTourReservations = async (): Promise<{
  success: boolean;
  reservations: TourReservation[];
}> => {
  const response = await fetch(`${API_URL}/api/tours/reservations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{
    success: boolean;
    reservations: TourReservation[];
  }>(response);
};