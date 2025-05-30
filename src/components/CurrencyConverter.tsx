'use client';

import { useEffect, useState } from 'react';

const API_KEY = '251169340405a39ccef3836d';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [result, setResult] = useState('');
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then((res) => res.json())
      .then((data) => {
        const allCurrencies = Object.keys(data.conversion_rates);
        setCurrencies(allCurrencies);
      })
      .catch(() => setResult('Не вдалося завантажити список валют.'));
  }, []);

  const handleConvert = () => {
    const amt = parseFloat(amount);
    if (Number.isNaN(amt)) {
      setResult('Введіть коректну суму.');
      return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const converted = (amt * data.conversion_rate).toFixed(2);
        setResult(`${amt} ${fromCurrency} = ${converted} ${toCurrency}`);
      })
      .catch(() => setResult('Помилка при конвертації.'));
  };

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Конвертер валют</h2>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <input
          type="number"
          className="border px-3 py-2 rounded flex-1"
          placeholder="Сума"
          value={ amount }
          onChange={ (e) => setAmount(e.target.value) }
        />

        <select
          className="border px-2 py-2 rounded flex-1"
          value={ fromCurrency }
          onChange={ (e) => setFromCurrency(e.target.value) }
        >
          {
            currencies.map((c) => (
              <option key={ c } value={ c }>
                { c }
              </option>
            ))
          }
        </select>

        <select
          className="border px-2 py-2 rounded flex-1"
          value={ toCurrency }
          onChange={ (e) => setToCurrency(e.target.value) }
        >
          {
            currencies.map((c) => (
              <option key={ c } value={ c }>
                { c }
              </option>
            ))
          }
        </select>

        <button
          onClick={ handleConvert }
          className="text-blue-600 hover:underline text-sm flex-shrink-0"
        >
                    Конвертувати
        </button>
      </div>

      <p className="mt-4 text-lg font-medium">{ result }</p>
    </div>
  );
};

export default CurrencyConverter;
