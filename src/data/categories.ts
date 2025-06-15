import { Category, CreateCategoryRequest, SearchCategoriesRequest } from '../types/categories';
import { API_URL, handleResponse } from './config';

/**
 * Fetch categories (with optional search term)
 */
export const fetchCategories = async (
  params: SearchCategoriesRequest = {}
): Promise<Category[]> => {
  let url = `${API_URL}/api/categories`;

  // Append query params if search is provided
  if (params.search) {
    url += `?search=${encodeURIComponent(params.search)}`;
  }

  const response = await fetch(url);

  return handleResponse<Category[]>(response);
};

/**
 * Create a new category
 */
export const createCategory = async (
  payload: CreateCategoryRequest
): Promise<{ message: string; category: Category }> => {
  const formData = new FormData();

  formData.append('ar_title', payload.arTitle);
  formData.append('en_title', payload.enTitle);
  formData.append('image', payload.image); // image file

  const response = await fetch(`${API_URL}/api/categories/create`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`, // assuming admin token stored
    },
  });

  return handleResponse<{ message: string; category: Category }>(response);
};