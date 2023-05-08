import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

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
      toast.error('请输入邮箱');
      return false;
    }
    if (password === '') {
      toast.error('请输入密码');
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
      toast.success('登录成功');
      setIsLoading(false);
      loginStore.onClose();
    } catch (error) {
      console.log(error);
      toast.error('登录失败');
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
            <h3 className='font-bold text-lg text-center'>登录</h3>
            <label
              htmlFor='login-modal'
              className='btn btn-sm btn-circle absolute right-2 top-2'
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
              <p>还没有账号？</p>
              <p
                className='hover:cursor-pointer hover:underline'
                onClick={() => {
                  clearInfo();
                  loginStore.onClose();
                  registerStore.onOpen();
                }}
              >
                去注册
              </p>
            </div>
          </div>
          <div className='modal-action'>
            <label
              htmlFor='login-modal'
              className='btn btn-primary'
              onClick={onFinish}
            >
              登录
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
