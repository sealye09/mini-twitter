import React, { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import useEditModal from '@/hooks/useEditModal';
import Modal from './Modal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import axios from 'axios';

interface EditModalProps {}

const EditModal: FC<EditModalProps> = ({}) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.username as string);
  const editStore = useEditModal();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handelError = () => {
    if (name === '') {
      toast.error('Invalid Email');
      return false;
    }
    if (username === '') {
      toast.error('Invalid Password');
      return false;
    }
    return true;
  };

  const onFinish = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!handelError()) throw new Error();

      // request
      axios.patch('/api/users/edit', { name, username, bio, avatarUrl, coverUrl });
      mutateFetchedUser();

      toast.success('Updated Succeed');
      setIsLoading(false);
      editStore.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Updated Failed');
    } finally {
      setIsLoading(false);
    }
  }, [name, username, bio, avatarUrl, coverUrl, editStore]);

  useEffect(() => {
    setAvatarUrl(currentUser?.avatarUrl as string);
    setCoverUrl(currentUser?.coverImageUrl as string);
    setName(currentUser?.name as string);
    setUsername(currentUser?.username as string);
    setBio(currentUser?.bio as string);
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.avatarUrl, currentUser?.coverImageUrl]);

  const body = (
    <div className='flex flex-col justify-center content-center items-center gap-6 w-full pt-10'>
      <div className='flex min-w-fit w-5/6 justify-between'>
        <label className='label'>
          <span className='label-text'>Avatar</span>
        </label>
        <input
          type='file'
          disabled={isLoading}
          value={avatarUrl}
          onChange={(e) => {
            setAvatarUrl(e.target.value);
          }}
          className='file-input file-input-bordered file-input-primary max-w-xs'
        />
      </div>
      <div className='flex min-w-fit w-5/6 justify-between'>
        <label className='label'>
          <span className='label-text'>Cover</span>
        </label>
        <input
          type='file'
          disabled={isLoading}
          value={coverUrl}
          onChange={(e) => {
            setCoverUrl(e.target.value);
          }}
          className='file-input file-input-bordered file-input-primary max-w-xs'
        />
      </div>
      <input
        disabled={isLoading}
        type='text'
        placeholder='Name'
        className='input input-bordered min-w-fit w-5/6'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        disabled={isLoading}
        type='text'
        placeholder='Username'
        className='input input-bordered min-w-fit w-5/6'
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <textarea
        className='textarea textarea-bordered w-5/6'
        placeholder='Bio'
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
      ></textarea>
    </div>
  );

  return (
    <Modal
      title='Profile'
      id='edit'
      actionLabel='Update'
      body={body}
      isOpen={editStore.isOpen}
      onClose={editStore.onClose}
      disabled={isLoading}
      onSubmit={onFinish}
    />
  );
};

export default EditModal;
