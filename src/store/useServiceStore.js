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
  loading: false,
  error: null,
  currentService: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchServices: async (filters = {}) => {
    set({ loading: true });
    try {
      const response = await GetServices(filters);
      set({ services: response.data || [], error: null });
    } catch (err) {
      set({ error: err.message || "Failed to fetch services" });
    } finally {
      set({ loading: false });
    }
  },

  fetchServiceDetail: async (serviceId) => {
    set({ loading: true });
    try {
      const response = await GetServiceDetail(serviceId);
      set({ currentService: response.data, error: null });
      return response.data;
    } catch (err) {
      set({ error: err.message || "Failed to fetch service details" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createService: async (serviceData) => {
    set({ loading: true });
    try {
      const response = await CreateService(serviceData);
      set((state) => ({
        services: [...state.services, response.data],
        error: null,
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message || "Failed to create service" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateService: async (serviceId, serviceData) => {
    set({ loading: true });
    try {
      const response = await UpdateService(serviceId, serviceData);
      set((state) => ({
        services: state.services.map((service) =>
          service.id === serviceId ? response.data : service
        ),
        error: null,
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message || "Failed to update service" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  deleteService: async (serviceId) => {
    set({ loading: true });
    try {
      await DeleteService(serviceId);
      set((state) => ({
        services: state.services.filter((service) => service.id !== serviceId),
        error: null,
      }));
      return true;
    } catch (err) {
      set({ error: err.message || "Failed to delete service" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useServiceStore;
