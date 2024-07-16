import { AppConfig } from "./config";

export type TPrice = {
  id: number;
  pair: string;
  price: number;
};

export async function getPriceByPair(pair: string) {
  const req = await fetch(`${AppConfig.api}${AppConfig.apiPrice}/${pair}`);
  const data = await req.json();
  return data as TPrice;
}
