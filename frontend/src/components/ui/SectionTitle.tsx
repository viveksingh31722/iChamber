import React from 'react';
import { clsx } from 'clsx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  alignment = 'center',
  className,
}: SectionTitleProps) => {
  return (
    <div
      className={clsx(
        'mb-12',
        alignment === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-secondary rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
