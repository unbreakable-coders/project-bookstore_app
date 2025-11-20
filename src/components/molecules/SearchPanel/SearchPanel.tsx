import { useEffect, useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { booksData } from '@/books/data/books';
import type { Book } from '@/types/book';
import { useNavigate } from 'react-router-dom';

interface SearchPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchPanel = ({ open, onOpenChange }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await booksData();
      setAllBooks(data);
      setLoading(false);
    };

    load();
  }, []);

  const filtered =
    searchQuery.trim() === ''
      ? []
      : allBooks.filter(b => {
          const q = searchQuery.toLowerCase();
          return (
            b.name.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q)
          );
        });

  const handleSelect = (book: Book) => {
    onOpenChange(false);
    navigate(`/books/${book.namespaceId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl border-none bg-transparent shadow-none top-1 translate-y-0 p-0">
        <div className="relative w-full rounded-xl border border-[#E3E3E3] bg-white px-6 py-4 shadow-lg">
          <DialogClose
            className="absolute right-4 top-4 text-[#9F9F9F] hover:text-[#050505] focus:outline-none"
            aria-label="Close search"
          >
            <Icon name="close" className="h-4 w-4" />
          </DialogClose>

          <div className="flex items-center gap-3 rounded-xl bg-[#F8F9FB] px-4 py-2">
            <Icon name="search" className="h-4 w-4 text-[#9F9F9F]" />
            <input
              autoFocus
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-9 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-[#B1B1B1]"
            />
          </div>

          <div className="mt-3 max-h-80 overflow-auto">
            {loading && (
              <p className="px-1 text-sm text-[#8F8F8F]">Loading...</p>
            )}

            {!loading &&
              filtered.map(book => (
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
                    <div className="truncate text-xs text-[#8F8F8F]">
                      {book.author}
                    </div>
                  </div>
                </div>
              ))}

            {!loading && searchQuery && filtered.length === 0 && (
              <p className="px-1 text-sm text-[#8F8F8F]">No books found.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
