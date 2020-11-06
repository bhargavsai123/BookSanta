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
					color='#696969'
					onPress={() => props.navigation.toggleDrawer()}
				/>
			}
			centerComponent={{
				text: props.title,
				style: {
					color: '#696969',
					fontSize: 20,
					fontWeight: 'bold',
				},
			}}
			backgroundColor='#F8BE85'
		/>
	);
};

export default MyHeader;
