import React, { FC, useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';

import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerStore = useRegisterModal();
  const loginStore = useLoginModal();

  const clearInfo = () => {
    setEmail('');
    setPassword('');
  };

  const handelError = () => {
    if (email === '') {
      toast.error('Invalid Email');
      return false;
    }
    if (password === '') {
      toast.error('Invalid Password');
      return false;
    }
    return true;
  };

  const onFinish = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!handelError()) throw new Error();

      await signIn('credentials', {
        email,
        password,
      });
      toast.success('Login Succeed');
      setIsLoading(false);
      loginStore.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Login Fail');
    } finally {
      setIsLoading(false);
      clearInfo();
    }
  }, [email, password, loginStore]);
  return (
    <div>
      <input
        type='checkbox'
        id='login-modal'
        className='modal-toggle'
        checked={loginStore.isOpen}
        onChange={() => {}}
      />
      <div className='modal'>
        <div className='modal-box'>
          <div>
            <h3 className='font-bold text-lg text-center'>Login</h3>
            <label
              htmlFor='login-modal'
              className='btn btn-sm btn-circle capitalize absolute right-2 top-2'
              onClick={() => {
                clearInfo();
                loginStore.onClose();
              }}
            >
              ✕
            </label>
          </div>
          <div className='flex flex-col justify-center content-center items-center gap-6 w-full pt-10'>
            <input
              disabled={isLoading}
              type='text'
              placeholder='Email'
              className='input input-bordered min-w-fit w-5/6'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              disabled={isLoading}
              type='password'
              placeholder='Password'
              className='input input-bordered min-w-fit w-5/6'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className='flex'>
              <p>Don't have a account? </p>
              <p
                className='hover:cursor-pointer hover:underline'
                onClick={() => {
                  clearInfo();
                  loginStore.onClose();
                  registerStore.onOpen();
                }}
              >
                Create one.
              </p>
            </div>
          </div>
          <div className='modal-action'>
            <label
              htmlFor='login-modal'
              className='btn btn-primary capitalize'
              onClick={onFinish}
            >
              Login
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
