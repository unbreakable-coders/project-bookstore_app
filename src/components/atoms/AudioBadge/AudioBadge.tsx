import React from 'react';
import { Icon } from '../Icon/Icon';

export const AudioBadge: React.FC = () => {
  return (
    <div className="absolute top-2 right-2 w-10 h-10 bg-ring rounded-full flex items-center justify-center shadow-lg z-10">
      <Icon name="earphones" alt="Audiobook available" className="w-5 h-5" />
    </div>
  );
};
