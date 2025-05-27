const HomePage = () => {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Фінансовий планувальник</h1>
      <p className="mb-6 text-lg">
          Цей застосунок допоможе вам контролювати доходи та витрати, планувати бюджет і досягати фінансових цілей.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Основні функції:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Ведення обліку доходів і витрат</li>
          <li>Категоризація транзакцій</li>
          <li>Додавання вкладень до фінансових записів</li>
          <li>Перегляд статистики по місяцях і роках</li>
          <li>Фільтрація записів за типом, категорією, місяцем і роком</li>
          <li>Графіки для візуалізації витрат і надходжень</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Топ-10 корисних посилань:</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li><a href="https://www.budget.gov.ua/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Бюджет України</a></li>
          <li><a href="https://www.minfin.com.ua/ua/currency/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Курс валют – Мінфін</a></li>
          <li><a href="https://www.finance.ua/ua/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Фінансові новини – Finance.ua</a></li>
          <li><a href="https://privatbank.ua/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Приват24</a></li>
          <li><a href="https://monobank.ua/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Монобанк</a></li>
          <li><a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Yahoo Finance</a></li>
          <li><a href="https://www.investopedia.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Investopedia (англ.)</a></li>
          <li><a href="https://www.rada.gov.ua/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Законодавство про фінанси</a></li>
          <li><a href="https://bank.gov.ua/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Національний банк України</a></li>
          <li><a href="https://www.budgetwithbuckets.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Інструменти бюджетування (англ.)</a></li>
        </ol>
      </section>
    </main>
  );
};

export default HomePage;
