export interface Stock {
    symbol: string;
    name: string;
    logoUrl: string;
    value: string;
    change: string;
    positive: boolean;
    history: { date: string; close: number }[];
}
