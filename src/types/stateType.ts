export interface IState {
  coins: {
    coins: {
      data: {
        coins: Array<object>;
        stats: {
          total: number;
          totalExchanges: number;
          totalMarketCap: number;
          total24hVolume: number;
          totalMarkets: number;
        };
      };
    };
  };
}
