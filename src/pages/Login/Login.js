import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";

import { onLogin } from "common/axios";
import { Loading } from "components";

export const Login = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onClickLogin = useCallback(async () => {
    setLoading(true);

    try {
      const response = await onLogin(input);
      const token = response.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        history.push("/category");
      }
    } catch (error) {
      alert("로그인 오류!");
    }

    // console.log(`pages/LoginPage/onClickLogin`, response);

    setLoading(false);
  }, [input, history]);

  return (
    <>
      <Header>
        <Title>Log into</Title>
        <Title>your account</Title>
      </Header>
      <InputWrapper>
        <InputId
          placeholder="Email"
          name="username"
          value={input.username}
          onChange={onChange}
        />
        <InputPw
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={onChange}
        />
      </InputWrapper>

      <SignInWrapper onClick={onClickLogin}>SIGN IN</SignInWrapper>

      <Loading view={loading} />
    </>
  );
};

export default Login;

const Header = styled.div`
  background-color: #222222;
  width: 375px;
  height: 200px;
`;

const Title = styled.div`
  font-family: "Roboto", sans-serif;
  color: white;
  font-size: 35px;
  font-weight: 800;
  position: relative;
  top: 50px;
  left: 40px;
  width: 280px;
`;

const InputWrapper = styled.div`
  margin-left: 37.5px;
  margin-top: 70px;
`;
const InputId = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #ddd;
`;
const InputPw = styled.input`
  width: 300px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #ddd;
`;

const SignInWrapper = styled.button`
  border: 2px solid black;
  border-radius: 25px;
  background-color: black;
  color: white;
  width: 300px;
  height: 50px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  padding: 10px;
  font-weight: 900;
  font-size: 15px;
  margin-top: 40px;
  margin-left: 37.5px;
`;
