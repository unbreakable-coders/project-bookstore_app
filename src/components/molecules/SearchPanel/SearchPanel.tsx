import { useEffect, useState, useMemo } from 'react';
import type { Book } from '@/types/book';
import { Icon } from '@/components/atoms/Icon';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useBooks } from '@/hooks/useBooks';

interface SearchPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mapLang = (lang: string): string => {
  const lc = lang.toLowerCase();

  if (lc === 'uk' || lc === 'ua' || lc === 'uk-ua') return 'UA';
  if (lc === 'en' || lc === 'eng' || lc === 'en-us') return 'ENG';

  return lang.toUpperCase();
};

const mapTypeIcon = (type: string): string => {
  const t = type.toLowerCase();

  if (t === 'paperback') return ' 📖';
  if (t === 'kindle') return ' 📋';
  if (t === 'audiobook') return ' 🔉';

  return '';
};

export const SearchPanel = ({ open, onOpenChange }: SearchPanelProps) => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const { books: allBooks, isLoading } = useBooks();

  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  const filteredBooks = useMemo(() => {
    const trimmed = searchQuery.trim();

    if (trimmed === '') return [];

    const q = trimmed.toLowerCase();

    return allBooks.filter(book => {
      const name = book.name.toLowerCase();
      const author = (book.author ?? '').toLowerCase();

      return name.includes(q) || author.includes(q);
    });
  }, [searchQuery, allBooks]);

  const handleSelect = (book: Book) => {
    onOpenChange(false);
    navigate(`/books/${book.namespaceId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl border-none bg-transparent shadow-none top-1 translate-y-0 p-0">
        <div className="relative w-full max-h-[380px] overflow-hidden rounded-xl border border-[#E3E3E3] bg-card px-6 py-3 shadow-lg">
          <DialogClose
            className="absolute right-4 top-4 text-[#9F9F9F] hover:text-[#050505] focus:outline-none cursor-pointer"
            aria-label="Close search"
          >
            <Icon name="close" className="h-4 w-4" />
          </DialogClose>

          <div className="flex items-center gap-3 rounded-xl bg-[#F8F9FB] px-4 py-2 mr-4">
            <Icon name="search" className="h-4 w-4 text-[#9F9F9F]" />
            <input
              autoFocus
              type="text"
              placeholder={t('Search books or authors...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-9 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-[#B1B1B1] text-primary"
            />
          </div>

          <div className="mt-3 max-h-80 overflow-auto">
            {isLoading && (
              <div className="flex h-24 items-center justify-center text-xl">
                <Loader />
              </div>
            )}

            {!isLoading &&
              filteredBooks.map(book => {
                const lang = mapLang(book.lang);
                const icon = mapTypeIcon(book.type);

                return (
                  <div
                    key={book.id}
                    onClick={() => handleSelect(book)}
                    className="flex items-center gap-3 px-2 py-2 hover:bg-[#F8F9FB] cursor-pointer"
                  >
                    <div className="h-10 w-8 bg-[#F0F0F0] rounded overflow-hidden">
                      {book.images?.[0] && (
                        <img
                          src={book.images[0]}
                          alt={book.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="truncate text-sm font-medium text-[#050505]">
                        {book.name}
                      </div>

                      <div className="truncate text-xs text-secondary flex gap-1 items-center">
                        <span>{book.author}</span>

                        <span>•</span>
                        <span>{lang}</span>

                        <span>•</span>
                        <span>{icon}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

            {!isLoading &&
              searchQuery.trim() !== '' &&
              filteredBooks.length === 0 && (
                <p className="px-1 text-sm text-[#8F8F8F]">
                  {t('No books found')}
                </p>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

