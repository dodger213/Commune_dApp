import axios, { AxiosResponse } from "axios";

/**
 * Retrieves all data from the API.
 * @returns {Promise<AxiosResponse<APIObjectType>>} A promise that resolves to an AxiosResponse object containing the API data.
 */
// Promise<AxiosResponse<APIObjectType>> 

 export async function getAll() {
    return await axios.get(`/api/v1/all`);
  }