import React, { FC, useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

import Header from '@/components/Header';

const darkThemes = ['dark', 'business', 'coffee', 'night', 'halloween'];
const lightThemes = [
  'light',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'fantasy',
  'cmyk',
  'autumn',
  'lemonade',
  'winter',
];

interface ThemesViewProps {}

const ThemesView: FC<ThemesViewProps> = ({}) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  const [changeWithSystem, setChangeWithSystem] = useState(false);
  return (
    <div className='themes'>
      <Header
        label='Themes'
        showBackArrow
      />
      <div className='p-4 flex flex-col justify-start items-start gap-4'>
        <div>
          <label className='label cursor-pointer p-0 flex gap-2'>
            <span className='label-text'>Change with system</span>
            <input
              type='checkbox'
              className='toggle toggle-primary rounded-full'
              checked={changeWithSystem}
              onClick={() => setChangeWithSystem(!changeWithSystem)}
            />
          </label>
        </div>
        <div className='flex flex-col gap-1'>
          <h2>Dark Themes</h2>
          <div className='flex flex-wrap gap-2'>
            {darkThemes.map((theme) => (
              <button
                key={theme}
                className='btn capitalize rounded-full min-w-fit shadow-xl'
                data-set-theme={theme}
                data-act-class='ACTIVECLASS'
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <h2>Light Themes</h2>
          <div className='flex flex-wrap gap-2'>
            {lightThemes.map((theme) => (
              <button
                key={theme}
                className='btn capitalize rounded-full min-w-fit shadow-xl'
                data-set-theme={theme}
                data-act-class='ACTIVECLASS'
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesView;
