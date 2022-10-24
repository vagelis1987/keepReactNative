import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';

import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const VslCrewScreen = () => {
  const {vslCrew} = useContext(AuthContext);

  return (
    <View>
      <Text>Welcome to crew List</Text>
      <ScrollView>
        {vslCrew.map(e => {
          return (
            <Card>
              <Card.Content>
                <Title>{e.fullName}</Title>
                <Paragraph>{e.Sspeciality}</Paragraph>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default VslCrewScreen;
