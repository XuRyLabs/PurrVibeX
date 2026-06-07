import api from './api';

export const locationService = {
  getCities: (countryCode) => api.get(`/locations/countries/${countryCode}/cities`),
  getWards: (countryCode, cityCode) => api.get(`/locations/countries/${countryCode}/cities/${cityCode}/wards`),
};

