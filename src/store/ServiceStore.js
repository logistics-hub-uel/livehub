import { create } from "zustand";
import {
  GetServices,
  CreateService,
  GetServiceDetail,
  UpdateService,
  DeleteService,
} from "../services/ServiceService";

const ServiceStore = create((set, get) => ({
  services: [],
  currentService: null,
  loading: false,
  error: null,
  metadata: {
    current_page: 1,
    page_size: 10,
    total_items: 0,
  },

  // Fetch services with filters
  fetchServices: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await GetServices(filters);
      if (response.status === 200) {
        set({
          services: response.data.data,
          metadata: response.data.metadata,
          loading: false,
        });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to fetch services",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error: error.message || "An error occurred while fetching services",
        loading: false,
      });
      throw error;
    }
  },

  // Get service details
  fetchServiceDetail: async (serviceId) => {
    set({ loading: true, error: null });
    try {
      const response = await GetServiceDetail(serviceId);
      if (response.status === 200) {
        set({ currentService: response.data.data, loading: false });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to fetch service details",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error:
          error.message || "An error occurred while fetching service details",
        loading: false,
      });
      throw error;
    }
  },

  // Create new service with specific fields
  createService: async ({
    name,
    description,
    price,
    available_time_slots = {},
    images_urls = [],
    is_support_preference = false,
    preference_social_media = [],
    category,
    supplier_id,
  }) => {
    set({ loading: true, error: null });
    try {
      const response = await CreateService({
        name,
        description,
        price,
        available_time_slots,
        images_urls,
        is_support_preference,
        preference_social_media,
        category,
        supplier_id,
      });

      if (response.status === 200) {
        await get().fetchServices();
        set({ loading: false });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to create service",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error: error.message || "An error occurred while creating service",
        loading: false,
      });
      throw error;
    }
  },

  // Update service with specific fields
  updateService: async (
    serviceId,
    {
      name,
      description,
      price,
      available_time_slots = {},
      images_urls = [],
      is_support_preference = false,
      preference_social_media = [],
      category,
    }
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await UpdateService(serviceId, {
        name,
        description,
        price,
        available_time_slots,
        images_urls,
        is_support_preference,
        preference_social_media,
        category,
      });

      if (response.status === 200) {
        // If we're viewing this service, refresh the details
        if (get().currentService && get().currentService.id === serviceId) {
          await get().fetchServiceDetail(serviceId);
        }
        await get().fetchServices();
        set({ loading: false });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to update service",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error: error.message || "An error occurred while updating service",
        loading: false,
      });
      throw error;
    }
  },

  // Delete service
  deleteService: async (serviceId) => {
    set({ loading: true, error: null });
    try {
      const response = await DeleteService(serviceId);
      if (response.status === 200) {
        if (get().currentService && get().currentService.id === serviceId) {
          set({ currentService: null });
        }
        await get().fetchServices();
        set({ loading: false });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to delete service",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error: error.message || "An error occurred while deleting service",
        loading: false,
      });
      throw error;
    }
  },

  // Reset current service
  resetCurrentService: () => {
    set({ currentService: null });
  },
}));

export default ServiceStore;
