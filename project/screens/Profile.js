import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { AuthContext } from '../App';

const Profile = () =>  {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile!</Text>
          <TouchableOpacity onPress={() => signOut()} >
            <Text>Back to login</Text>
          </TouchableOpacity>
        </View>
      );
}

export default Profile;