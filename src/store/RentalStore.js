import { create } from "zustand";
import {
  GetRentals,
  CreateRental,
  UpdateRentalStatus,
} from "../services/RentalService";

const RentalStore = create((set, get) => ({
  rentals: [],
  currentRental: null,
  loading: false,
  error: null,
  metadata: {
    current_page: 1,
    page_size: 10,
    total_items: 0,
  },
  filters: {
    buyer_id: null,
    service_id: null,
    supplier_id: null,
    status: null,
    from_date: null,
    to_date: null,
    page: 1,
    page_size: 10,
    sort_by: "id",
    order: "desc",
  },

  setFilters: (newFilters) => {
    set({
      filters: {
        ...get().filters,
        ...newFilters,
        page: newFilters.page ? newFilters.page : 1,
      },
    });
  },

  resetFilters: () => {
    set({
      filters: {
        buyer_id: null,
        service_id: null,
        supplier_id: null,
        status: null,
        from_date: null,
        to_date: null,
        page: 1,
        page_size: 10,
        sort_by: "id",
        order: "desc",
      },
    });
  },

  // Fetch rentals with filters
  fetchRentals: async (customFilters = null) => {
    set({ loading: true, error: null });
    try {
      // Use provided custom filters or stored filters
      const filters = customFilters || get().filters;

      // Clean up the filters object by removing null/undefined values
      const cleanFilters = Object.entries(filters)
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      const response = await GetRentals(cleanFilters);
      if (response.status === 200) {
        set({
          rentals: response.data.data,
          metadata: response.data.metadata,
          loading: false,
        });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to fetch rentals",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error: error.message || "An error occurred while fetching rentals",
        loading: false,
      });
      throw error;
    }
  },

  // Helper methods for common filter scenarios
  fetchBuyerRentals: async (buyerId) => {
    get().setFilters({ buyer_id: buyerId });
    return await get().fetchRentals();
  },

  fetchSupplierRentals: async (supplierId) => {
    get().setFilters({ supplier_id: supplierId });
    return await get().fetchRentals();
  },

  fetchServiceRentals: async (serviceId) => {
    get().setFilters({ service_id: serviceId });
    return await get().fetchRentals();
  },

  fetchRentalsByStatus: async (status) => {
    get().setFilters({ status });
    return await get().fetchRentals();
  },

  fetchRentalsByDateRange: async (fromDate, toDate) => {
    get().setFilters({ from_date: fromDate, to_date: toDate });
    return await get().fetchRentals();
  },

  // Pagination methods
  setPage: async (page) => {
    get().setFilters({ page });
    return await get().fetchRentals();
  },

  setPageSize: async (pageSize) => {
    get().setFilters({ page_size: pageSize, page: 1 });
    return await get().fetchRentals();
  },

  nextPage: async () => {
    if (
      get().metadata.current_page <
      Math.ceil(get().metadata.total_items / get().metadata.page_size)
    ) {
      get().setFilters({ page: get().metadata.current_page + 1 });
      return await get().fetchRentals();
    }
    return null;
  },

  previousPage: async () => {
    if (get().metadata.current_page > 1) {
      get().setFilters({ page: get().metadata.current_page - 1 });
      return await get().fetchRentals();
    }
    return null;
  },

  // Sorting methods
  setSorting: async (sortBy, order = "desc") => {
    get().setFilters({ sort_by: sortBy, order });
    return await get().fetchRentals();
  },

  // Create a new rental
  createRental: async ({
    service_id,
    buyer_id,
    status = "pending", // Default status
    from_date,
    to_date,
    demand_description,
    expectation,
  }) => {
    set({ loading: true, error: null });
    try {
      const response = await CreateRental({
        service_id,
        buyer_id,
        status,
        from_date,
        to_date,
        demand_description,
        expectation,
      });

      if (response.status === 200) {
        await get().fetchRentals();
        set({ loading: false });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to create rental",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error: error.message || "An error occurred while creating rental",
        loading: false,
      });
      throw error;
    }
  },

  updateRentalStatus: async (rental_id, status) => {
    set({ loading: true, error: null });
    try {
      const response = await UpdateRentalStatus(rental_id, status);
      if (response.status === 200) {
        await get().fetchRentals();
        set({ loading: false });
        return response.data;
      } else {
        set({
          error: response.data.message || "Failed to update rental status",
          loading: false,
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      set({
        error:
          error.message || "An error occurred while updating rental status",
        loading: false,
      });
      throw error;
    }
  },
  fetchRentalById: async (rentalId) => {
    const rental = get().rentals.find((r) => r.id === rentalId);

    if (rental) {
      set({ currentRental: rental });
      return rental;
    }
    await get().fetchRentals({});
    const updatedRental = get().rentals.find((r) => r.id === rentalId);
    if (updatedRental) {
      set({ currentRental: updatedRental });
      return updatedRental;
    }

    return null;
  },
  resetCurrentRental: () => {
    set({ currentRental: null });
  },
}));

export default RentalStore;
