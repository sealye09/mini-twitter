import React, { FC, useEffect } from 'react';
import { themeChange } from 'theme-change';

import Header from '@/components/Header';

interface ThemesViewProps {}

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'halloween',
  'fantasy',
  'cmyk',
  'autumn',
  'business',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

const ThemesView: FC<ThemesViewProps> = ({}) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className='themes'>
      <Header
        label='Themes'
        showBackArrow
      />

      <div className='flex gap-2 p-4 flex-wrap'>
        {themes.map((theme) => (
          <button
            key={theme}
            className='btn btn-primary btn-xl rounded-full min-w-fit shadow-xl'
            data-set-theme={theme}
            data-act-class='ACTIVECLASS'
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemesView;
