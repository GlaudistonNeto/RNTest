import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import PostsCity from '../screens/PostsCity';
import PostUser from '../screens/PostsUser';
import Search from '../screens/Search';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="NewPost" component={NewPost} />
      <Tab.Screen name="PostsCity" component={PostsCity} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}

export default AppRoutes;