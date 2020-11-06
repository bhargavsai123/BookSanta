/** @format */

import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import SideBar from './CustomSidebarMenu';
import Settings from '../screens/settingsScreen';

export const AppDrawerNavigator = createDrawerNavigator(
	{
		Home: { screen: AppTabNavigator },
		Setting: { screen: Settings },
	},
	{
		contentComponent: SideBar,
	},
	{
		initialRouteName: 'Setting',
	}
);
