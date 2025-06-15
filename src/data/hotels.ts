// hotelApi.ts
import {
  Hotel,
  HotelRoom,
  HotelReservation,
  ReserveHotelRequest,
  FetchRoomsRequest,
  SearchHotelsRequest,
} from '../types/hotels';
import { handleResponse, API_URL } from './config';

/**
 * Fetch hotels (with optional search term)
 */
export const fetchHotels = async (
  params: SearchHotelsRequest = {}
): Promise<Hotel[]> => {
  let url = `${API_URL}/api/hotels`;

  if (params.search) {
    url += `?search=${encodeURIComponent(params.search)}`;
  }

  const response = await fetch(url);
  return handleResponse<Hotel[]>(response);
};

/**
 * Get rooms of a specific hotel
 */
export const fetchHotelRooms = async (
  payload: FetchRoomsRequest
): Promise<{
  success: boolean;
  hotel: {
    id: number;
    ar_title: string;
    en_title: string;
  };
  rooms: HotelRoom[];
}> => {
  const response = await fetch(`${API_URL}/api/hotels/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hotel_id: payload.hotelId }),
  });

  return handleResponse<{
    success: boolean;
    hotel: {
      id: number;
      ar_title: string;
      en_title: string;
    };
    rooms: HotelRoom[];
  }>(response);
};

/**
 * Reserve a hotel room
 */
export const reserveHotelRoom = async (
  payload: ReserveHotelRequest
): Promise<{
  success: boolean;
  message: string;
  reservation: {
    reservation_id: number;
    start_date: string;
    nights: number;
    payment_method: string | null;
    status: string;
    total_price: number;
  };
}> => {
  const body = {
    hotel_id: payload.hotelId,
    room_number: payload.roomNumber,
    start_date: payload.startDate,
    nights: payload.nights,
    payment_method: payload.paymentMethod ?? null,
    coupon_code: payload.couponCode ?? null,
  };

  const response = await fetch(`${API_URL}/api/hotels/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify(body),
  });

  return handleResponse<{
    success: boolean;
    message: string;
    reservation: {
      reservation_id: number;
      start_date: string;
      nights: number;
      payment_method: string | null;
      status: string;
      total_price: number;
    };
  }>(response);
};

/**
 * Get current user's hotel reservations
 */
export const getUserHotelReservations = async (): Promise<{
  success: boolean;
  reservations: HotelReservation[];
}> => {
  const response = await fetch(`${API_URL}/api/hotels/reservations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{
    success: boolean;
    reservations: HotelReservation[];
  }>(response);
};