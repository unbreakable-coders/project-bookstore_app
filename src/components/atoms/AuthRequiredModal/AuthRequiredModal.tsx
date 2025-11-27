import type { FC } from 'react';

interface AuthRequiredModalProps {
  title: string;
  message: string;
}

export const AuthRequiredModal: FC<AuthRequiredModalProps> = ({
  title,
  message,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-card rounded-xl p-6 max-w-sm w-full shadow-lg border border-border">
        <h3 className="text-lg text-center text-primary font-semibold mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-center text-sm">{message}</p>
      </div>
    </div>
  );
};
