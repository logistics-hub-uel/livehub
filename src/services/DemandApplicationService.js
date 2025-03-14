import ApiService from "./ApiService";

const applicationApi = new ApiService("/demand-applications");

/**
 * Get list of demand applications with filters
 * @param {Object} filters - Filter parameters
 * @param {string} filters.demand_id - Filter by demand ID
 * @param {string} filters.supplier_id - Filter by supplier ID
 * @param {string} filters.application_status - Filter by status (pending, accepted, rejected, completed)
 * @param {string} filters.payment_method - Filter by payment method
 * @param {string} filters.promotion_event - Filter by promotion event
 * @param {number} filters.page_size - Number of items per page (default: 10)
 * @param {number} filters.page - Page number (default: 1)
 * @param {string} filters.sort_by - Sort field (default: id)
 * @param {string} filters.order - Sort order (default: desc)
 * @returns {Promise} - API response with applications list and metadata
 */
export const getDemandApplications = async (filters = {}) => {
  const response = await applicationApi.protected().get("", {
    params: filters,
  });
  return response.data;
};

/**
 * Create a new demand application
 * @param {Object} applicationData - Application data
 * @param {string} applicationData.demand_id - Demand ID
 * @param {string} applicationData.supplier_id - Supplier ID
 * @param {string} applicationData.payment_method - Payment method
 * @param {string} applicationData.promotion_event - Promotion event
 * @param {string} applicationData.note - Note
 * @returns {Promise} - API response with created application data
 */
export const createDemandApplication = async (applicationData) => {
  const response = await applicationApi.protected().post("", applicationData);
  return response.data;
};

/**
 * Get demand application details by ID
 * @param {string} applicationId - Application ID
 * @returns {Promise} - API response with application details
 */
export const getDemandApplicationById = async (applicationId) => {
  const response = await applicationApi.protected().get(`/${applicationId}`);
  return response.data;
};

/**
 * Update demand application by ID
 * @param {string} applicationId - Application ID
 * @param {Object} updateData - Data to update
 * @param {string} updateData.payment_method - Updated payment method
 * @param {string} updateData.application_status - Updated status (pending, accepted, rejected, completed)
 * @param {string} updateData.promotion_event - Updated promotion event
 * @param {string} updateData.note - Updated note
 * @returns {Promise} - API response with updated application data
 */
export const updateDemandApplication = async (applicationId, updateData) => {
  const response = await applicationApi
    .protected()
    .put(`/${applicationId}`, updateData);
  return response.data;
};
