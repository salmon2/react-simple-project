import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeField, initializeForm, register } from '../../modules/auth';

import AuthForm from './AuthForm';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }

    if (password !== passwordConfirm) {
      //TODO: 오류처리
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' })
      );

      return;
    }
    dispatch(register({ username, password }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/'); //홈화면으로 이동

      try {
        localStorage.setItem('user', JSON.stringfy(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    ></AuthForm>
  );
};

export default RegisterForm;
