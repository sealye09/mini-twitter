import React, { FC, useEffect } from "react";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import Header from "@/components/Header";
import NotificationCard from "@/components/NotificationCard";
import Loader from "@/components/Loader";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = ({}) => {
  const { data: currUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: notifications = [], isLoading } = useNotification(currUser?.id);

  useEffect(() => {
    axios.patch("/api/users/read_notifications", { userId: currUser?.id as string });
    mutateCurrentUser();
  }, [mutateCurrentUser, currUser]);

  if (isLoading || !currUser) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="notifications min-h-screen">
      <Header
        label="Notifications"
        showBackArrow
      />
      <div className='w-full h-full'>
        {notifications?.length ? (
          notifications.map((notification) => (
            <NotificationCard
              id={notification.id}
              content={notification.content}
              createdAt={notification.createdAt}
            />
          ))
        ) : (
          <div className="flex justify-center text-xl pt-20">No Notifacations</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
