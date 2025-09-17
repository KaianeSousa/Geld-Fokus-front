export interface StockResponse {
    summary: {
      symbol: string;
      logoUrl: string;
      shortName: string;
      longName: string;
      value: string;
      change: {
        absolute: string;
        percent: string;
      };
      positive: boolean;
    };
    history: { date: string; close: number }[];
}