/**
 * Example:
 * {
 *   "bitcoin": {
 *       "usd": 63801
 *   },
 *   "dogecoin": {
 *       "usd": 0.122989
 *   },
 *   "ethereum": {
 *       "usd": 3417.77
 *   },
 *   "solana": {
 *       "usd": 156.16
 *   },
 *   "tether": {
 *       "usd": 0.999329
 *   }
 * }
 */
export type TGeckoSimplePriceResponse = {
  [name: string]: {
    [baseCurrency: string]: number;
  };
};
