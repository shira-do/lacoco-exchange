"use client";

import { useEffect, useState } from "react";
import CurrencySelect from "./components/CurrencySelect";
import Header from "./components/Header";
import NumberInput from "./components/NumberInput";
import SwapButton from "./components/SwapButton";
import { getPriceByPair, TPrice } from "./functions/price";
import { getToken, TToken } from "./functions/token";

export default function Home() {
  const [options, setOptions] = useState<string[]>([]);
  const [selectOptions1, setSelectOptions1] = useState<string[]>([]);
  const [selectOptions2, setSelectOptions2] = useState<string[]>([]);
  const [selectValue1, setSelectValue1] = useState<string>("");
  const [selectValue2, setSelectValue2] = useState<string>("");
  const [price, setPrice] = useState<TPrice | null>(null);
  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");

  useEffect(() => {
    (async () => {
      const tokens = await getToken();
      const symbols = tokens.map((token: TToken) => token.symbol);
      setOptions(symbols);
      setSelectOptions1(symbols);
      setSelectOptions2(symbols);
    })();
  }, []);

  const handleSelectOnChange1 = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    console.log("Selected 1 currency:", value);
    setSelectValue1(value);
    setSelectOptions2(options.filter((option) => option !== value));
    console.debug("value: ", value);
    const price = await getPrice(inputValue1, inputValue2, value, selectValue2);
    if (!price) return;

    setPrice(price);
    const parsed = parseFloat(inputValue1);
    setInputValue2(!isNaN(parsed) ? `${parsed * price.price}` : "");
  };

  const handleSelectOnChange2 = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("Selected 2 currency:", event.target.value);
    setSelectOptions1(
      options.filter((option) => option !== event.target.value)
    );
    setSelectValue2(event.target.value);

    const price = await getPrice(
      inputValue1,
      inputValue2,
      selectValue1,
      event.target.value
    );
    if (!price) return;
    setPrice(price);
    const parsed = parseFloat(inputValue1);
    setInputValue2(!isNaN(parsed) ? `${parsed * price.price}` : "");
  };

  const handleSwap = async () => {
    console.log("Swap", selectValue1, selectValue2);
    const valueTemp1 = selectValue1;
    const valueTemp2 = selectValue2;
    const optionTemp = selectOptions1;
    setSelectOptions1(selectOptions2);
    setSelectValue1(selectValue2);
    setSelectOptions2(optionTemp);
    setSelectValue2(valueTemp1);

    const price = await getPrice(
      inputValue1,
      inputValue2,
      valueTemp2,
      valueTemp1
    );
    if (!price) return;
    setPrice(price);

    const parsed = parseFloat(inputValue1);
    setInputValue2(!isNaN(parsed) ? `${parsed * price.price}` : "");
  };

  const handleInput1 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(event.target.value);

    setInputValue1(event.target.value);
    const price = await getPrice(
      event.target.value,
      inputValue2,
      selectValue1,
      selectValue2
    );
    if (!price) return;
    setPrice(price);
    setInputValue2(`${parsed * price.price}`);
  };

  const handleInput2 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(event.target.value);

    setInputValue2(event.target.value);
    const price = await getPrice(
      inputValue1,
      event.target.value,
      selectValue1,
      selectValue2
    );
    if (!price) return;
    setPrice(price);
    setInputValue1(`${parsed / price.price}`);
  };

  const getPrice = async (
    input1: string,
    input2: string,
    select1: string = "",
    select2: string = ""
  ) => {
    if ((!input1 && !input2) || !select1 || !select2) return null;

    const p = await getPriceByPair(`${select1}-${select2}`);
    console.debug("Price:", p);
    return p;
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-24">
      <Header />

      <div className="flex flex-col items-center justify-center w-[500] pt-10 p-4">
        <div className="flex w-full">
          <div className="flex w-2/3 pr-2">
            <NumberInput value={inputValue1} onChange={handleInput1} />
          </div>
          <div className="w-1/3">
            <CurrencySelect
              value={selectValue1}
              options={selectOptions1}
              onChange={handleSelectOnChange1}
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex w-full justify-center items-center p-4">
            <SwapButton onClick={handleSwap} />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex w-2/3 pr-2">
            <NumberInput value={inputValue2} onChange={handleInput2} />
          </div>
          <div className="w-1/3">
            <CurrencySelect
              value={selectValue2}
              options={selectOptions2}
              onChange={handleSelectOnChange2}
            />
          </div>
        </div>
        {price && (
          <div className="flex w-full justify-center p-4">
            1 {selectValue1} = {price?.price} {selectValue2}
          </div>
        )}
      </div>
    </main>
  );
}
