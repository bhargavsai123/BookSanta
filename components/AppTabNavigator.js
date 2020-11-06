/** @format */

import * as React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BookDonate from '../screens/BookDonateScreen';
import BookRequest from '../screens/BookRequestScreen';

export const AppTabNavigator = createBottomTabNavigator(
	{
		'Donate Books': { screen: BookDonate },
		'Request Books': { screen: BookRequest },
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarOptions: {
				keyboardHidesTabBar: true,
				activeTintColor: '#ff3d00',
				inactiveTintColor: '#ff7e00',
				style: {
					borderWidth: 0,
					backgroundColor: '#fcb977',
					borderTopColor: '#ff3d00',
				},
			},
		}),
	}
);
