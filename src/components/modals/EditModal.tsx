import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import useEditModal from "@/hooks/modals/useEditModal";
import useCurrentUser from "@/hooks/fetcher/useCurrentUser";
import useUser from "@/hooks/fetcher/useUser";
import ImageUpload from "@/components/ImageUpload";

import Modal from "./Modal";
import useImageCropModal from "@/hooks/modals/useImageCropModal";
import ImageCropModal from "./ImageCropModal";

type UserInfo = {
  name: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  coverImageUrl?: string;
};

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const isOpen = useEditModal((state) => state.isOpen);
  const onClose = useEditModal((state) => state.onClose);

  const cropModal = useImageCropModal();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async () => {
    const handelError = () => {
      if (name === "") {
        toast.error("Invalid Email");
        return false;
      }
      if (username === "") {
        toast.error("Invalid Password");
        return false;
      }
      return true;
    };

    try {
      setIsLoading(true);
      if (!handelError()) throw new Error();

      let avatarUrl = "";
      let coverImageUrl = "";

      // upload image
      // if (avatar !== "") {
      //   const res = await axios.post("/api/upload", { image: avatar });
      //   avatarUrl = res.data;
      // }
      avatarUrl = avatar;

      // if (coverImage !== "") {
      //   const res = await axios.post("/api/upload", { image: coverImage });
      //   coverImageUrl = res.data;
      // }
      coverImageUrl = coverImage;

      const newUserInfo: UserInfo = {
        name,
        username,
        bio,
        avatarUrl,
        coverImageUrl,
      };

      if (avatarUrl === "") delete newUserInfo.avatarUrl;
      if (coverImageUrl === "") delete newUserInfo.coverImageUrl;

      // request
      await axios.patch("/api/users/edit", newUserInfo);
      await mutateFetchedUser();

      toast.success("Updated Succeed");
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Updated Failed");
    } finally {
      setIsLoading(false);
      setAvatar("");
      setCoverImage("");
    }
  };

  const handleClose = () => {
    onClose();
    setAvatar("");
    setCoverImage("");
  };

  useEffect(() => {
    if (!currentUser) return;
    setName(currentUser.name);
    setUsername(currentUser.username);
    setBio(currentUser.bio as string);
  }, [currentUser]);

  const body = useMemo(
    () => (
      <div className="flex flex-col justify-center content-center items-center gap-6 w-full pt-10">
        <ImageUpload
          value={avatar}
          disabled={isLoading}
          onChange={(image) => {
            setAvatar(image);
            cropModal.onOpen(image);
          }}
          label="avatar"
        />
        <ImageUpload
          value={coverImage}
          disabled={isLoading}
          onChange={(image) => {
            setCoverImage(image);
            cropModal.onOpen(image);
          }}
          label="cover"
        />
        <input
          disabled={isLoading}
          type="text"
          placeholder="Name"
          className="input input-bordered min-w-fit w-5/6"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          disabled={isLoading}
          type="text"
          placeholder="Username"
          className="input input-bordered min-w-fit w-5/6"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <textarea
          className="textarea textarea-bordered w-5/6"
          placeholder="Bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </div>
    ),
    [
      avatar,
      bio,
      coverImage,
      isLoading,
      name,
      username,
      setAvatar,
      setBio,
      setCoverImage,
      setName,
      setUsername,
    ]
  );

  return (
    <>
      <Modal
        title="Profile"
        id="edit"
        actionLabel="Update"
        body={body}
        isOpen={isOpen}
        onClose={handleClose}
        disabled={isLoading}
        onSubmit={onFinish}
      />
      <ImageCropModal
        value={avatar}
        onChange={(value: string) => {
          setAvatar(value);
        }}
        onClose={() => {
          cropModal.onClose();
        }}
        isOpen={cropModal.isOpen}
      />
    </>
  );
};

export default EditModal;
