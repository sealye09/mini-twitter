import Header from '@/components/Header';
import React, { FC } from 'react';

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = ({}) => {
  return (
    <div className='notifications'>
      {' '}
      <Header label='Notifications' />
    </div>
  );
};

export default Notifications;
