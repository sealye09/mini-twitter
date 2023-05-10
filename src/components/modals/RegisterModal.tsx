import React, { FC, useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const registerStore = useRegisterModal();
  const loginStore = useLoginModal();

  const clearInfo = () => {
    setUsername('');
    setName('');
    setPassword('');
    setEmail('');
  };

  const handelError = () => {
    if (username === '') {
      toast.error('Invalid Username');
      return false;
    }
    if (email === '') {
      toast.error('Invalid Email');
      return false;
    }
    if (password === '') {
      toast.error('Invalid Password');
      return false;
    }
    if (name === '') {
      toast.error('Invalid Name');
      return false;
    }
    return true;
  };

  const onFinish = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!handelError()) throw new Error();
      await axios.post('/api/register', {
        username,
        password,
        name,
        email,
      });
      setIsLoading(false);
      toast.success('Register Succeed');
      await signIn('credentials', {
        email,
        password,
      });

      registerStore.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Register Failed');
    } finally {
      setIsLoading(false);
    }
  }, [password, username, name, email, registerStore]);

  const body = (
    <div className='flex flex-col justify-center content-center items-center gap-6 w-full pt-10'>
      <input
        disabled={isLoading}
        type='text'
        placeholder='Username'
        required
        className='input input-bordered min-w-fit w-5/6'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        disabled={isLoading}
        type='text'
        placeholder='Email'
        required
        className='input input-bordered min-w-fit w-5/6'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        disabled={isLoading}
        type='password'
        required
        placeholder='Password'
        className='input input-bordered min-w-fit w-5/6'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        disabled={isLoading}
        type='text'
        placeholder='Name'
        required
        className='input input-bordered min-w-fit w-5/6'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
    </div>
  );

  const footer = (
    <div className='flex justify-center gap-2 pt-8'>
      <p>Already have a account? </p>
      <p
        className='hover:cursor-pointer hover:underline'
        onClick={() => {
          clearInfo();
          registerStore.onClose();
          loginStore.onOpen();
        }}
      >
        Go to login.
      </p>
    </div>
  );
  return (
    <Modal
      title='Register'
      id='register'
      body={body}
      footer={footer}
      isOpen={registerStore.isOpen}
      actionLabel='Register'
      disabled={isLoading}
      onClose={registerStore.onClose}
      onSubmit={onFinish}
    />
  );
};

export default RegisterModal;
