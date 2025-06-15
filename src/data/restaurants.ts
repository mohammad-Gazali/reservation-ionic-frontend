import {
  Restaurant,
  RestaurantReservation,
  ReserveRestaurantRequest,
  SearchRestaurantsRequest,
} from '../types/restaurants';
import { API_URL, handleResponse } from './config';


/**
 * Fetch restaurants (with optional search term)
 */
export const fetchRestaurants = async (
  params: SearchRestaurantsRequest = {}
): Promise<Restaurant[]> => {
  let url = `${API_URL}/api/restaurants`;

  // Append query params if search is provided
  if (params.search) {
    url += `?search=${encodeURIComponent(params.search)}`;
  }

  const response = await fetch(url);

  return handleResponse<Restaurant[]>(response);
};

/**
 * Reserve a restaurant table
 */
export const reserveRestaurant = async (
  payload: ReserveRestaurantRequest
): Promise<{
  success: boolean;
  reservation: Omit<RestaurantReservation, 'id'> & { id: number };
}> => {
  const body = {
    restaurant_id: payload.restaurantId,
    reservation_time: payload.reservationTime,
    guests: payload.guests,
    area_type: payload.areaType ?? null,
  };

  const response = await fetch(`${API_URL}/api/restaurants/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify(body),
  });

  return handleResponse<{
    success: boolean;
    reservation: Omit<RestaurantReservation, 'id'> & { id: number };
  }>(response);
};

/**
 * Get current user's restaurant reservations
 */
export const getUserReservations = async (): Promise<{
  success: boolean;
  reservations: RestaurantReservation[];
}> => {
  const response = await fetch(`${API_URL}/api/restaurants/reservations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{
    success: boolean;
    reservations: RestaurantReservation[];
  }>(response);
};