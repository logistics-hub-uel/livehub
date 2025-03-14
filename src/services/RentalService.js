import ApiService from "./ApiService";

const rentalApi = new ApiService("/rental");

export const GetRentals = async (filters = {}) => {
  const response = await rentalApi.protected().get("", { params: filters });
  return response;
};

export const CreateRental = async ({
  service_id,
  buyer_id,
  from_date,
  to_date,
  demand_description,
  expectation,
}) => {
  const response = await rentalApi.protected().post("", {
    service_id,
    buyer_id,
    status: "pending",
    from_date,
    to_date,
    demand_description,
    expectation,
  });
  return response;
};

export const UpdateRentalStatus = async (rental_id, status) => {
  const response = await rentalApi.protected().put(`/${rental_id}`, { status });
  return response;
};

export const GetUserRentals = async () => {
  const response = await rentalApi.protected().get("");
  return response;
};
