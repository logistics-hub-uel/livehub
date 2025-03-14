import { create } from "zustand";
import {
  GetServices,
  CreateService,
  GetServiceDetail,
  UpdateService,
  DeleteService,
} from "../services/ServiceService";

const useServiceStore = create((set, get) => ({
  services: [],
  currentService: null,
  loading: false,
  error: null,

  // Fetch all services
  fetchServices: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await GetServices(filters);
      set({ services: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Get service details
  getServiceDetail: async (serviceId) => {
    set({ loading: true, error: null });
    try {
      const response = await GetServiceDetail(serviceId);
      set({ currentService: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    set({ loading: true, error: null });
    try {
      const response = await CreateService(serviceData);
      set((state) => ({
        services: [...state.services, response.data],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Update existing service
  updateService: async (serviceId, serviceData) => {
    set({ loading: true, error: null });
    try {
      const response = await UpdateService(serviceId, serviceData);
      set((state) => ({
        services: state.services.map((service) =>
          service.id === serviceId ? response.data : service
        ),
        currentService: response.data,
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Delete service
  deleteService: async (serviceId) => {
    set({ loading: true, error: null });
    try {
      await DeleteService(serviceId);
      set((state) => ({
        services: state.services.filter((service) => service.id !== serviceId),
        loading: false,
      }));
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  // Reset current service
  resetCurrentService: () => set({ currentService: null }),
}));

export default useServiceStore;
