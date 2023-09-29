import React, { FC, useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/modals/useLoginModal";
import useRegisterModal from "@/hooks/modals/useRegisterModal";
import Modal from "./Modal";

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerStore = useRegisterModal();
  const loginStore = useLoginModal();

  const clearInfo = () => {
    setEmail("");
    setPassword("");
  };

  const body = (
    <div className="flex flex-col justify-center content-center items-center gap-6 w-full pt-10">
      <input
        disabled={isLoading}
        type="text"
        placeholder="Email"
        className="input input-bordered min-w-fit w-5/6"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        disabled={isLoading}
        type="password"
        placeholder="Password"
        className="input input-bordered min-w-fit w-5/6"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
  );

  const footer = (
    <div className="flex justify-center gap-2 pt-8">
      <p>Do not have a account? </p>
      <p
        className="hover:cursor-pointer hover:underline"
        onClick={() => {
          clearInfo();
          loginStore.onClose();
          registerStore.onOpen();
        }}
      >
        Create one.
      </p>
    </div>
  );

  const onFinish = useCallback(async () => {
    const handelError = () => {
      if (email === "") {
        toast.error("Invalid Email");
        return false;
      }
      if (password === "") {
        toast.error("Invalid Password");
        return false;
      }
      return true;
    };
    try {
      setIsLoading(true);
      if (!handelError()) throw new Error();

      await signIn("credentials", {
        email,
        password,
      });
      toast.success("Login Succeed");
      setIsLoading(false);
      loginStore.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    } finally {
      setIsLoading(false);
      clearInfo();
    }
  }, [email, password, loginStore]);

  return (
    <Modal
      title="Login"
      id="login"
      body={body}
      footer={footer}
      isOpen={loginStore.isOpen}
      actionLabel="Login"
      disabled={isLoading}
      onClose={loginStore.onClose}
      onSubmit={onFinish}
    />
  );
};

export default LoginModal;
