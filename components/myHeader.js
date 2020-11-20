/** @format */

import * as React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';

const MyHeader = (props) => {
	return (
		<Header
			leftComponent={
				<Icon
					name='bars'
					type='font-awesome'
					color='#ff8a65'
					onPress={() => props.navigation.toggleDrawer()}
				/>
			}
			centerComponent={{
				text: props.title,
				style: {
					color: '#ff8a65',
					fontSize: 20,
					fontWeight: 'bold',
				},
			}}
			backgroundColor='#F8BE85'
			containerStyle={{
				borderBottomWidth: 1,
				borderBottomColor: '#ff8a65',
			}}
		/>
	);
};

export default MyHeader;
