import React, { FC } from "react";

import useNotification from "@/hooks/fetcher/useNotification";
import Header from "@/components/layout/Header";
import NotificationCard from "@/components/NotificationCard";
import Loader from "@/components/Loader";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = ({}) => {
  const { data: notifications, isLoading, readNotifications } = useNotification();
  readNotifications();

  return (
    <div className="notifications min-h-screen">
      <Header
        label="Notifications"
        showBackArrow
      />
      <div className="w-full h-full">
        {isLoading || !notifications ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <div className="flex justify-center text-xl pt-20">No Notifications</div>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              id={notification.id}
              content={notification.content}
              createdAt={notification.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
