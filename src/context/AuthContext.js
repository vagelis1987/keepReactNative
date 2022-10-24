import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [allVessel, setAllVessel] = useState([]);
  const [vslCrew, setVslCrew] = useState([]);
  useEffect(() => {
    isLoggedIn();
  }, []);

  const getAllVessel = () => {
    setIsLoading(true);
    let access_token = userInfo.bearer;
    console.log('getAllVessel');
    console.log('-----------');
    console.log('-----------');
    console.log('-----------');

    axios
      .get(`${BASE_URL}/lists/vwship1?dataSource=test`, {
        headers: {Authorization: `Bearer ${access_token}`},
      })
      .then(res => {
        setAllVessel(res.data);

        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(`login error ${e}`);
      });
  };

  const login = (userName, password) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/auth`,
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        let userInfo = res.data;

        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        isLoggedIn();
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setIsLoading(false);
    setAllVessel([]);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };
  const getVesselCrewlist = vesselId => {
    let access_token = userInfo.bearer;

    axios
      .get(
        `${BASE_URL}/lists/vwservicedisplay?dataSource=test&key=${vesselId}`,
        {
          headers: {Authorization: `Bearer ${access_token}`},
        },
      )
      .then(res => {
        setVslCrew(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(` getVesselCrewlist error ${e}`);
      });
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        getAllVessel,
        getVesselCrewlist,
        login,
        logout,
        vslCrew,
        allVessel,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
