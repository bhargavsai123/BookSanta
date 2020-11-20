/** @format */

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import BookDonate from '../screens/BookDonateScreen';
import RecieverDetails from '../screens/recieverDetailsScreen';

export const AppStackNavigator = createStackNavigator(
	{
		DonateList: { screen: BookDonate },
		RecieverDetails: { screen: RecieverDetails },
	},
	{
		initialRouteName: 'DonateList',
	}
);
