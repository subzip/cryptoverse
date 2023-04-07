import axios from "axios";

export const getTokens = async (limit: number) => {
  try {
    const res = await axios.get("https://coinranking1.p.rapidapi.com/coins", {
      headers: {
        "X-RapidAPI-Key": "21d38f54b4msh61cb21551c267fcp12ed74jsn4d29b0b456f2",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
      params: {
        limit,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getExchanges = async () => {
  try {
    const res = await axios.get(
      "https://coinpaprika1.p.rapidapi.com/exchanges",
      {
        headers: {
          "X-RapidAPI-Key":
            "21d38f54b4msh61cb21551c267fcp12ed74jsn4d29b0b456f2",
          "X-RapidAPI-Host": "coinpaprika1.p.rapidapi.com",
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getTokenByID = async (id: string | undefined) => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${id}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "21d38f54b4msh61cb21551c267fcp12ed74jsn4d29b0b456f2",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getTokenHistory = async (
  id: string | undefined,
  timePeriod: string | undefined
) => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
      {
        headers: {
          "X-RapidAPI-Key":
            "21d38f54b4msh61cb21551c267fcp12ed74jsn4d29b0b456f2",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getNews = async (limit: number) => {
  try {
    const res = await axios.get(
      "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news",
      {
        params: {
          pair_ID: "1057391",
          page: "3",
          time_utc_offset: "28800",
          lang_ID: "1",
          limit,
        },
        headers: {
          "X-RapidAPI-Key":
            "21d38f54b4msh61cb21551c267fcp12ed74jsn4d29b0b456f2",
          "X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
