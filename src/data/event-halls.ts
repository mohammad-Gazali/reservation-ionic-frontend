// eventHallApi.ts
import {
  EventHall,
  EventHallReservation,
  ReserveEventHallRequest,
  SearchEventHallsRequest,
} from '../types/event-halls';
import { handleResponse, API_URL } from './config';

/**
 * Fetch event halls (with optional search)
 */
export const fetchEventHalls = async (
  params: SearchEventHallsRequest = {}
): Promise<EventHall[]> => {
  let url = `${API_URL}/api/event-halls`;

  if (params.search) {
    url += `?search=${encodeURIComponent(params.search)}`;
  }

  const response = await fetch(url);
  return handleResponse<EventHall[]>(response);
};

/**
 * Reserve an event hall
 */
export const reserveEventHall = async (
  payload: ReserveEventHallRequest
): Promise<{
  message: string;
  reservation: Omit<EventHallReservation, 'id'> & { id: number };
  discount_applied: boolean;
  original_price: number;
  final_price: number;
}> => {
  const body = {
    event_hall_id: payload.eventHallId,
    event_type: payload.eventType,
    reservation_date: payload.reservationDate,
    reservation_time: payload.reservationTime,
    guests: payload.guests,
    payment_method: payload.paymentMethod,
    coupon_code: payload.couponCode ?? null,
  };

  const response = await fetch(`${API_URL}/api/event-halls/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify(body),
  });

  return handleResponse<{
    message: string;
    reservation: Omit<EventHallReservation, 'id'> & { id: number };
    discount_applied: boolean;
    original_price: number;
    final_price: number;
  }>(response);
};

/**
 * Get current user's event hall reservations
 */
export const getUserEventHallReservations = async (): Promise<{
  status: string;
  data: EventHallReservation[];
}> => {
  const response = await fetch(`${API_URL}/api/event-halls/reservations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{
    status: string;
    data: EventHallReservation[];
  }>(response);
};