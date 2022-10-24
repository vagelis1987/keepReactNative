import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const {
    userInfo,
    isLoading,
    logout,
    getAllVessel,
    getVesselCrewlist,
    allVessel,
  } = useContext(AuthContext);
  let cnName = userInfo.claims.names[0];

  const test = vslCode => {
    getVesselCrewlist(vslCode);
    navigation.navigate('VslCrew');
  };

  return (
    <View>
      <Spinner visible={isLoading} />

      <Text style={styles.welcome}>Welcome {cnName}</Text>
      <Button title="Logout" color="red" onPress={logout} />
      <Button title="GetAllVessel" color="green" onPress={getAllVessel} />
      <ScrollView>
        {allVessel.map(e => {
          return (
            <Card>
              <Card.Content>
                <Title>{e.shipname}</Title>
                <Paragraph>{e.shipcode}</Paragraph>
                <Button
                  title="GetCrewList"
                  onPress={() => test(e.ploioname)}
                  color="blue"
                />
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
