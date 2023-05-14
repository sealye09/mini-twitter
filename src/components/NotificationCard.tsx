import { format } from "date-fns";
import React, { FC, useMemo } from "react";
import { BsCheck, BsCheck2, BsTwitter } from "react-icons/bs";

interface NotificationCardProps {
  id: string;
  content: string;
  createdAt: Date;
}

const NotificationCard: FC<NotificationCardProps> = ({ content, id, createdAt }) => {
  const createdTime = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return format(new Date(createdAt), "MMMM dd, yyyy");
  }, [createdAt]);
  return (
    <div className="flex flex-row justify-between items-center p-6 gap-4 hover:bg-base-200">
      <p>{content}</p>
      <div className="flex gap-4 items-center">
        <p>{createdTime}</p>
        <BsCheck size={20} />
      </div>
    </div>
  );
};

export default NotificationCard;
