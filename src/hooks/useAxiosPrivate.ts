import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { axiosPrivateClient } from '../api/axios-client';
import { AppDispatch, useTypedSelector } from '../app/store';
import { refreshToken } from '../features/auth/auth-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

const useAxiosPrivate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  useEffect(() => {
    const requestIntercept = axiosPrivateClient.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = auth.accessToken;
        }
        if (!config.headers['x-client-id']) {
          config.headers['x-client-id'] = auth.user?.userId;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivateClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const actionResult = await dispatch(refreshToken({}));
          const resp = unwrapResult(actionResult);
          prevReq.headers['Authorization'] = resp.metadata.tokens.accessToken;
          return axiosPrivateClient(prevReq);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateClient.interceptors.request.eject(requestIntercept);
      axiosPrivateClient.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosPrivateClient;
};

export default useAxiosPrivate;
