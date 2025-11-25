import { useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface FormState {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
}

export const MockStripeCheckout = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = params.get('session_id') || 'mock_session';
  const amount = params.get('amount') || '';

  const [form, setForm] = useState<FormState>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Спеціальна логіка для номеру картки
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16); // тільки цифри, максимум 16
      const groups = digits.match(/.{1,4}/g) || [];
      const formatted = groups.join('-'); // ****-****-****-****
      setForm(prev => ({ ...prev, cardNumber: formatted }));
      return;
    }

    // Місяць закінчення: тільки цифри, максимум 2 символи
    if (name === 'expiryMonth') {
      const digits = value.replace(/\D/g, '').slice(0, 2);
      setForm(prev => ({ ...prev, expiryMonth: digits }));
      return;
    }

    // Рік закінчення: тільки цифри, максимум 2 символи
    if (name === 'expiryYear') {
      const digits = value.replace(/\D/g, '').slice(0, 2);
      setForm(prev => ({ ...prev, expiryYear: digits }));
      return;
    }

    // CVV: тільки цифри, максимум 4 символи
    if (name === 'cvv') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      setForm(prev => ({ ...prev, cvv: digits }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const digitsInCard = form.cardNumber.replace(/\D/g, '');
    const monthNum = Number(form.expiryMonth);
    const yearNum = Number(form.expiryYear);

    if (
      !digitsInCard ||
      !form.expiryMonth ||
      !form.expiryYear ||
      !form.cvv ||
      !form.cardholderName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.country.trim() ||
      !form.address.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (digitsInCard.length !== 16) {
      setError('Card number must contain 16 digits.');
      return;
    }

    if (Number.isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      setError('Expiry month must be between 1 and 12.');
      return;
    }

    if (Number.isNaN(yearNum) || yearNum < 25) {
      setError('Expiry year must be 25 or later.');
      return;
    }

    if (form.cvv.length < 3) {
      setError('CVV must be 3–4 digits.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      navigate(
        `/payment-success?session_id=${encodeURIComponent(
          sessionId,
        )}&amount=${encodeURIComponent(amount)}`,
      );
    }, 800);
  };

  const handleCancel = () => {
    navigate('/checkout?payment=cancelled');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="border-b px-6 py-4 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-300">
              Secure mock payment
            </p>
            <h1 className="text-lg font-semibold">Bookstore Checkout</h1>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-300">Amount to pay</p>
            <p className="text-xl font-semibold">
              {amount ? `${amount}₴` : '—'}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-[1.6fr,1.2fr] p-6 md:p-8"
        >
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide">
              Card details
            </h2>

            <div className="rounded-xl border border-slate-200 p-4 space-y-4 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Virtual card
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    Mock Visa / MasterCard
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="h-6 w-10 rounded-md bg-slate-800" />
                  <span className="h-6 w-10 rounded-md bg-yellow-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cardNumber"
                  className="text-xs font-medium text-slate-600"
                >
                  Card number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="1234-5678-9012-3456"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="expiryMonth"
                    className="text-xs font-medium text-slate-600"
                  >
                    Expiry month
                  </label>
                  <input
                    id="expiryMonth"
                    name="expiryMonth"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    maxLength={2}
                    value={form.expiryMonth}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="expiryYear"
                    className="text-xs font-medium text-slate-600"
                  >
                    Expiry year
                  </label>
                  <input
                    id="expiryYear"
                    name="expiryYear"
                    type="text"
                    inputMode="numeric"
                    placeholder="YY"
                    maxLength={2}
                    value={form.expiryYear}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="cvv"
                    className="text-xs font-medium text-slate-600"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="•••"
                    value={form.cvv}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cardholderName"
                  className="text-xs font-medium text-slate-600"
                >
                  Cardholder name
                </label>
                <input
                  id="cardholderName"
                  name="cardholderName"
                  type="text"
                  placeholder="JOHN DOE"
                  value={form.cardholderName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm uppercase outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Demo mode only. Do not enter real card details.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide">
              Contact details
            </h2>

            <div className="space-y-3 rounded-xl border border-slate-200 p-4 bg-white">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium text-slate-600"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+380 00 000 00 00"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="text-xs font-medium text-slate-600"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                >
                  <option value="">Select country</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Poland">Poland</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-xs font-medium text-slate-600"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street, house, apartment"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:scale-[1.02] hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? 'Processing payment...'
                  : amount
                    ? `Pay ${amount}₴`
                    : 'Confirm payment'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Cancel and return to checkout
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              This is a mock payment screen used for demo purposes only.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
