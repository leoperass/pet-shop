import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-paragraph-medium',
        'text-paragraph-small',
        'text-title',
        'text-title-modal',
        'text-label-large',
        'text-label-medium',
        'text-label-small',
        'text-link',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
