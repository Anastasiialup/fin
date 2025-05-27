const AboutPage = () => {
  return (
    <main className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start">
      <div className="image-container">
        <img
          src="https://i.pinimg.com/736x/77/a8/b3/77a8b372fd2bc55d6a5b2c92698b568f.jpg"
          alt="Silly Cat"
          className="rounded-md w-full md:w-80 shadow-md"
        />
      </div>

      <div className="content space-y-4">
        <h2 className="text-2xl font-bold">Про автора</h2>
        <p>Привіт! Мене звати Анастасія.</p>
        <p>Я студентка Житомирського політехнічного університету, спеціалізуюсь як у фронтенді, так і у бекенді. Маю великий інтерес до фінансового планування та допомоги іншим ефективно керувати своїми фінансами.</p>
        <p>За освітою я компьютерний інженер, із захопленням поглиблююся у коді та вирішую складні завдання. Моя подорож у світ програмування розпочалася університетом, де я відкрила свою любов до створення елегантних рішень для реальних завдань.</p>
        <p>Якщо у вас є які-небудь питання, потрібна допомога або ви бажаєте співпрацювати, будь ласка, звьяжіться зі мною за нижчевказаними контактами. Я завжди рада спілкуванню з колегами програмістами та ентузіастами!</p>

        <div className="contact-info space-y-1">
          <p><strong>Email:</strong> <a href="mailto:nastalupasina1@gmail.com" className="text-blue-600 underline">nastalupasina1@gmail.com</a></p>
          <p><strong>Instagram:</strong> <a href="https://www.instagram.com/damn_dich" target="_blank" rel="noreferrer" className="text-blue-600 underline">@damn_dich</a></p>
          <p><strong>Telegram:</strong> <a href="https://t.me/damn_dich" target="_blank" rel="noreferrer" className="text-blue-600 underline">Anastasiia❤️</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/Anastasiialup" target="_blank" rel="noreferrer" className="text-blue-600 underline">Anastasiia Lupashyna</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/anastasiialupashyna/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Anastasiia Lupashyna</a></p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
