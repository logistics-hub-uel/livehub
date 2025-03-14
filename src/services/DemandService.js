import ApiService from "./ApiService";

const demandApi = new ApiService("/demands");

/**
 * Get list of demands with filters
 * @param {Object} filters - Filter parameters
 * @param {string} filters.type_demand_service - Filter by service type
 * @param {string} filters.demand_status - Filter by status (pending, accepted, rejected, completed)
 * @param {string} filters.from_date - Filter demands starting from this date
 * @param {string} filters.to_date - Filter demands ending by this date
 * @param {string} filters.account_id - Filter by account ID
 * @param {boolean} filters.is_support_preference - Filter by preference support flag
 * @param {number} filters.page_size - Number of items per page (default: 10)
 * @param {number} filters.page - Page number (default: 1)
 * @param {string} filters.sort_by - Sort field (default: id)
 * @param {string} filters.order - Sort order (default: desc)
 * @returns {Promise} - API response with demands list and metadata
 */
export const getDemands = async (filters = {}) => {
  const response = await demandApi.protected().get("", {
    params: filters,
  });
  return response.data;
};

/**
 * Create a new demand
 * @param {Object} demandData - Demand data
 * @param {string} demandData.from_date - Start date for the demand
 * @param {string} demandData.to_date - End date for the demand
 * @param {string} demandData.demand_description - Description of the demand
 * @param {string} demandData.previous_experience - Previous experience details
 * @param {string} demandData.expectation - Expectation details
 * @param {Array<string>} demandData.preference_social_media - Preferred social media platforms
 * @param {boolean} demandData.is_support_preference - Support preference flag
 * @param {string} demandData.type_demand_service - Type of demand service
 * @param {string} demandData.account_id - Account ID
 * @returns {Promise} - API response with created demand data
 */
export const createDemand = async (demandData) => {
  const response = await demandApi.protected().post("", demandData);
  return response.data;
};

/**
 * Get demand details by ID
 * @param {string} demandId - Demand ID
 * @returns {Promise} - API response with demand details
 */
export const getDemandById = async (demandId) => {
  const response = await demandApi.protected().get(`/${demandId}`);
  return response.data;
};

/**
 * Update demand by ID
 * @param {string} demandId - Demand ID
 * @param {Object} updateData - Data to update
 * @param {string} updateData.from_date - Updated start date
 * @param {string} updateData.to_date - Updated end date
 * @param {string} updateData.demand_description - Updated description
 * @param {string} updateData.previous_experience - Updated previous experience
 * @param {string} updateData.expectation - Updated expectation
 * @param {Array<string>} updateData.preference_social_media - Updated social media preferences
 * @param {boolean} updateData.is_support_preference - Updated support preference flag
 * @param {string} updateData.type_demand_service - Updated service type
 * @returns {Promise} - API response with updated demand data
 */
export const updateDemand = async (demandId, updateData) => {
  const response = await demandApi.protected().put(`/${demandId}`, updateData);
  return response.data;
};

/**
 * Delete demand by ID
 * @param {string} demandId - Demand ID
 * @returns {Promise} - API response
 */
export const deleteDemand = async (demandId) => {
  const response = await demandApi.protected().delete(`/${demandId}`);
  return response.data;
};
