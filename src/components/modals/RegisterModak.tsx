import React, { FC, useCallback, useState } from 'react';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

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
      toast.error('请输入用户名');
      return false;
    }
    if (email === '') {
      toast.error('请输入邮箱');
      return false;
    }
    if (password === '') {
      toast.error('请输入密码');
      return false;
    }
    if (name === '') {
      toast.error('请输入昵称');
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
      toast.success('注册成功');
      await signIn('credentials', {
        email,
        password,
      });

      registerStore.onClose();
    } catch (error) {
      console.log(error);
      toast.error('注册失败');
    } finally {
      setIsLoading(false);
      clearInfo();
    }
  }, [password, username, name, email, registerStore]);

  return (
    <div>
      <input
        type='checkbox'
        id='register-modal'
        className='modal-toggle'
        checked={registerStore.isOpen}
        onChange={() => {}}
      />
      <div className='modal'>
        <div className='modal-box'>
          <div>
            <h3 className='font-bold text-lg text-center'>注册</h3>
            <label
              htmlFor='register-modal'
              className='btn btn-sm btn-circle absolute right-2 top-2'
              onClick={() => {
                clearInfo();
                registerStore.onClose();
              }}
            >
              ✕
            </label>
          </div>
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
            <div className='flex'>
              <p>已经有了账号？</p>
              <p
                className='hover:cursor-pointer hover:underline'
                onClick={() => {
                  clearInfo();
                  registerStore.onClose();
                  loginStore.onOpen();
                }}
              >
                去登录
              </p>
            </div>
          </div>
          <div className={`modal-action`}>
            <label
              htmlFor='register-modal'
              className='btn btn-primary'
              onClick={onFinish}
            >
              注册
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
