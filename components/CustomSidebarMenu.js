/** @format */

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class SideBar extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 0.8 }}>
					<DrawerItems {...this.props} />
				</View>
				<View>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('WelcomeScreen');
							firebase.auth().signOut();
						}}>
						<Text>Sign Out</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
