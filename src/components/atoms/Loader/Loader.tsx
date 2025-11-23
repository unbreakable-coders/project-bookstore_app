import { useTranslation } from 'react-i18next';
import './loader.css';

export const Loader = () => {
  const { t } = useTranslation();

  const books = [
    { delay: 0, color: 'from-[#F5E6D3] to-[#E8D5C4]' },
    { delay: 1.2, color: 'from-[#E8D5C4] to-[#D4C4A8]' },
    { delay: 2.4, color: 'from-[#D4C4A8] to-[#C4B393]' },
    { delay: 3.6, color: 'from-[#C4B393] to-[#B5A397]' },
    { delay: 4.8, color: 'from-[#B5A397] to-[#A6907E]' },
    { delay: 6.0, color: 'from-[#E8D5C4] to-[#D4C4A8]' },
  ];

  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        {/* Текст Loading */}
        <div className="loader-text">{t('LOADING')}</div>

        {/* Літаючі книги */}
        {books.map((book, index) => (
          <div
            key={index}
            className="book-flying"
            style={{
              animationDelay: `${book.delay}s`,
            }}
          >
            {/* Книга */}
            <div className={`book bg-gradient-to-br ${book.color}`}>
              {/* Корінець книги */}
              <div className="book-spine"></div>

              {/* Сторінки */}
              <div className="book-pages">
                <div className="page-line w-3/4"></div>
                <div className="page-line w-full"></div>
                <div className="page-line w-2/3"></div>
                <div className="page-line w-5/6 mt-2"></div>
                <div className="page-line w-3/4"></div>
              </div>

              {/* Обкладинка з текстурою */}
              <div className="book-texture"></div>

              {/* Тінь */}
              <div
                className="book-shadow"
                style={{
                  animationDelay: `${book.delay}s`,
                }}
              ></div>
            </div>
          </div>
        ))}

        {/* Декоративна лінія */}
        <div className="decorative-line"></div>
      </div>
    </div>
  );
};
