const API_URL = 'https://699f184378dda56d396c5fee.mockapi.io/products';

/** Class representing a service for interacting with the data API */
class ApiService {
  /** Fetches all data based on filter and sort parameters
   * @param {Object} params - Query parameters (search, category, sortBy, order)
   * @returns {Promise<Array>} List of data  */
  async getAll(params = {}) {
    try {
      const url = new URL(API_URL);

      Object.keys(params).forEach(key => {
        if (
          params[key] !== undefined &&
          params[key] !== 'all' &&
          params[key] !== ''
        ) {
          url.searchParams.append(key, params[key]);
        }
      });

      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      return await res.json();
    } catch (error) {
      console.error('ApiService.getAll failed:', error);
      return [];
    }
  }

  /** Fetches a single item by its ID
   * @param {string} id - Data ID
   * @returns {Promise<Object|null>} Data or null on error */
  async getById(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`);

      if (!res.ok) throw new Error('Product not found');

      return await res.json();
    } catch (error) {
      console.error(`ApiService.getById(${id}) failed:`, error);
      return null;
    }
  }

  /** Creates a new item
   * @param {Object} data - Data item
   * @returns {Promise<Object|null>} Created data item */
  async create(data) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create');

      return await res.json();
    } catch (error) {
      console.error('ApiService.create failed:', error);
      return null;
    }
  }

  /** Updates an existing data using PUT or PATCH
   * @param {string} id - item ID
   * @param {Object} data - Updated data
   * @param {boolean} isPartial - Use PATCH if true, PUT otherwise
   * @returns {Promise<Object|null>} Updated data item */
  async update(id, data, isPartial = false) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: isPartial ? 'PATCH' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to update data item');

      return await res.json();
    } catch (error) {
      console.error(`ApiService.update(${id}) failed:`, error);
      return null;
    }
  }

  /** Deletes a item by ID
   * @param {string} id - Item ID
   * @returns {Promise<boolean>} True if deleted successfully */
  async delete(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

      if (!res.ok) throw new Error('Failed to delete data item');

      return true;
    } catch (error) {
      console.error(`ApiService.delete(${id}) failed:`, error);
      return false;
    }
  }
}

export default new ApiService(API_URL);
