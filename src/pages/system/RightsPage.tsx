import { PageHeader } from '@/components/molecules/PageHeader';
import { useTranslation } from 'react-i18next';

export const RightsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <PageHeader
        title={t('Copyright and License')}
        description={t(
          'Information about the use of materials and intellectual property of the project',
        )}
        className="mb-16 md:mb-20 text-center max-w-4xl mx-auto"
      />

      <div className="space-y-12 max-w-4xl mx-auto text-secondary">
        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <h2 className="font-bold text-[22px] leading-[31px] mb-4">
            © Copyright
          </h2>
          {t(
            'All materials presented on this website, including text, graphics, logos, icons, images, and code, are the property of the Bookstore Project Team.',
          )}
          <p className="text-[14px] leading-[21px] font-semibold mt-4">
            © {new Date().getFullYear()} Bookstore Project Team.{' '}
            {t('All rights reserved.')}
          </p>
        </section>

        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <pre>
            <code>{`${t('MIT License')}
Copyright (c) 2025 Bookstore Team

${t(`Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`)}`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default RightsPage;
