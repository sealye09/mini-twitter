import React, { FC } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import {
  BsBellFill,
  BsXDiamondFill,
  BsHouseFill,
  BsTwitter,
  BsBoxArrowRight,
} from "react-icons/bs";
import { FaFeather, FaUser } from "react-icons/fa";

import useLoginModal from "@/hooks/modals/useLoginModal";
import useRegisterModal from "@/hooks/modals/useRegisterModal";
import useCurrentUser from "@/hooks/fetcher/useCurrentUser";

import SideBarItem from "./SideBarItem";
import Avatar from "@/components/user/Avatar";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const router = useRouter();
  const registerStore = useRegisterModal();
  const loginStore = useLoginModal();
  const { data: currUser, isLoading } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
      auth: false,
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: `/users/notifications`,
      auth: true,
      alert: !!currUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${!isLoading && !!currUser ? currUser.id : ""}`,
      auth: true,
    },
    {
      icon: BsXDiamondFill,
      label: "Themes",
      href: "/themes",
      auth: false,
    },
  ];

  return (
    <div className="flex fixed flex-col gap-8 h-screen">
      <ul className="menu w-full">
        <li
          onClick={() => {
            router.push("/");
          }}
          className="items-start rounded-full"
        >
          <div className="relative rounded-full h-14 w-14 flex items-start justify-center lg:hidden text-primary">
            <BsTwitter size={28} />
          </div>
          <div className="relative hidden lg:flex rounded-full items-center gap-4 p-4 text-primary">
            <BsTwitter size={24} />
          </div>
        </li>
        {items.map((item) => (
          <SideBarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            auth={item.auth && !currUser}
            alert={item.alert}
          />
        ))}
      </ul>
      {!isLoading && !!currUser ? (
        <>
          <button
            className="btn btn-primary btn-xl flex justify-center rounded-full min-w-fit shadow-xl gap-4"
            onClick={() => {
              console.log("twitter");
              router.push("/");
            }}
          >
            <FaFeather
              size={24}
              className="block lg:hidden text-slate-100"
            />
            <p className="text-base hidden lg:block">Tweet</p>
          </button>
          <div
            className="mx-auto lg:hidden hover:cursor-pointer"
            onClick={() => {
              router.push(`/users/${currUser.id}`);
            }}
          >
            <Avatar
              className="h-10 w-10"
              src={currUser.avatarUrl}
            />
          </div>
          <div
            className="card min-w-fit h-fit bg-base-200 shadow-xl hidden lg:block lg:w-full hover:cursor-pointer"
            onClick={() => {
              router.push(`/users/${currUser.id}`);
            }}
          >
            <div className="flex m-4 gap-2 justify-start items-center w-60">
              <Avatar
                className="h-10 w-10"
                src={currUser.avatarUrl}
              />
              <div className="flex flex-1 flex-col items-start justify-between">
                <p className="font-semibold text-sm">{currUser.name}</p>
                <p className="text-sm text-neutral-500">@{currUser.username}</p>
              </div>
              <button
                className="btn btn-primary capitalize btn-sm rounded-full text"
                onClick={() => {
                  signOut();
                }}
              >
                <BsBoxArrowRight />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary capitalize btn-xl rounded-full min-w-fit shadow-xl"
            onClick={() => {
              loginStore.onOpen();
            }}
          >
            <p className="text-base">Login Now</p>
          </button>
          <button
            className="btn btn-primary capitalize btn-xl rounded-full min-w-fit shadow-xl"
            onClick={() => {
              registerStore.onOpen();
            }}
          >
            <p className="text-base">Register Now</p>
          </button>
        </>
      )}
    </div>
  );
};

export default SideBar;
