import { AppConfig } from "./config";

export type TToken = {
  name: string;
  symbol: string;
};

export async function getToken() {
  const req = await fetch(`${AppConfig.api}${AppConfig.apiToken}`);
  const data = await req.json();
  return data as Array<TToken>;
}
