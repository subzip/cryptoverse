import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "21d38f54b4msh61cb21551c267fcp12ed74jsn4d29b0b456f2",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
