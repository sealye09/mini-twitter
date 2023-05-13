import React, { FC, useEffect } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import Header from "@/components/Header";
import NotificationCard from "@/components/NotificationCard";
import axios from "axios";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = ({}) => {
  const { data: currUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: notifications = [] } = useNotification(currUser?.id);

  useEffect(() => {
    axios.patch("/api/users/read_notifications", { userId: currUser?.id as string });
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  return (
    <div className="notifications min-h-screen">
      <Header
        label="Notifications"
        showBackArrow
      />
      <div>
        {notifications?.length ? (
          notifications.map((notification) => (
            <NotificationCard
              id={notification.id}
              content={notification.content}
              createdAt={notification.createdAt}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Notifications;
