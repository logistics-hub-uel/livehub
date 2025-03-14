import { create } from "zustand";
import {
  getDemands,
  createDemand,
  updateDemand,
  deleteDemand,
  getDemandById,
} from "../services/DemandService";

const useDemandStore = create((set, get) => ({
  // Trạng thái
  demands: [],
  selectedDemand: null,
  loading: false,
  error: null,
  filter: {
    type_demand_service: null,
    demand_status: null,
    from_date: null,
    to_date: null,
    page: 1,
    page_size: 10,
    sort_by: "id",
    order: "desc",
  },
  pagination: {
    total: 0,
    page: 1,
    page_size: 10,
    total_pages: 0,
  },

  // Actions
  fetchDemands: async (customFilter = {}) => {
    try {
      set({ loading: true, error: null });
      const currentFilter = { ...get().filter, ...customFilter };
      
      // Loại bỏ các giá trị null hoặc undefined
      Object.keys(currentFilter).forEach(key => {
        if (currentFilter[key] === null || currentFilter[key] === undefined) {
          delete currentFilter[key];
        }
      });
      
      const response = await getDemands(currentFilter);
      
      set({
        demands: response.data || [],
        pagination: {
          total: response.total || 0,
          page: response.page || 1,
          page_size: response.page_size || 10,
          total_pages: response.total_pages || 0,
        },
        filter: currentFilter,
      });
      return response;
    } catch (error) {
      set({ error: error.message || "Lỗi khi tải danh sách yêu cầu" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setFilter: (newFilter) => {
    set({ filter: { ...get().filter, ...newFilter } });
  },

  resetFilter: () => {
    set({
      filter: {
        type_demand_service: null,
        demand_status: null,
        from_date: null,
        to_date: null,
        page: 1,
        page_size: 10,
        sort_by: "id",
        order: "desc",
      },
    });
  },

  getDemandById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await getDemandById(id);
      set({ selectedDemand: response });
      return response;
    } catch (error) {
      set({ error: error.message || "Lỗi khi tải chi tiết yêu cầu" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setSelectedDemand: (demand) => {
    set({ selectedDemand: demand });
  },

  createDemand: async (demandData) => {
    try {
      set({ loading: true, error: null });
      const response = await createDemand(demandData);
      await get().fetchDemands(); // Tải lại danh sách sau khi tạo
      return response;
    } catch (error) {
      set({ error: error.message || "Lỗi khi tạo yêu cầu mới" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateDemand: async (id, updateData) => {
    try {
      set({ loading: true, error: null });
      const response = await updateDemand(id, updateData);
      
      // Cập nhật demand trong danh sách nếu có
      set((state) => ({
        demands: state.demands.map((demand) =>
          demand.id === id ? { ...demand, ...updateData } : demand
        ),
        selectedDemand: state.selectedDemand?.id === id
          ? { ...state.selectedDemand, ...updateData }
          : state.selectedDemand
      }));
      
      return response;
    } catch (error) {
      set({ error: error.message || "Lỗi khi cập nhật yêu cầu" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteDemand: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteDemand(id);
      
      // Xóa demand khỏi danh sách
      set((state) => ({
        demands: state.demands.filter((demand) => demand.id !== id),
        selectedDemand: state.selectedDemand?.id === id ? null : state.selectedDemand,
      }));
      
      return response;
    } catch (error) {
      set({ error: error.message || "Lỗi khi xóa yêu cầu" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Lọc yêu cầu theo trạng thái
  filterDemandsByStatus: (status) => {
    if (!status) return get().demands;
    return get().demands.filter((demand) => demand.demand_status === status);
  },
}));

export default useDemandStore; 