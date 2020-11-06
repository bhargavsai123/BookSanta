/** @format */

import * as React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StatusBar,
	StyleSheet,
} from 'react-native';
import db from '../config';
import * as firebase from 'firebase';
import MyHeader from '../components/myHeader';

export default class Settings extends React.Component {
	constructor() {
		super();
		this.state = {
			emailId: '',
			firstName: '',
			lastName: '',
			address: '',
			contact: '',
			documentId: '',
		};
	}
	getUserDetails = () => {
		var email = firebase.auth().currentUser.email;
		db.collection('users')
			.where('email_id', '==', email)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var data = doc.data();
					this.setState({
						emailId: data.email_id,
						firstName: data.first_name,
						lastName: data.last_name,
						address: data.address,
						contact: data.contact,
						documentId: doc.id,
					});
				});
			});
	};
	componentDidMount() {
		this.getUserDetails();
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#F8BE85' }}>
				<MyHeader title={'Settings'} navigation={this.props.navigation} />
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						width: '100%',
					}}>
					<TextInput
						placeholder='First Name'
						value={this.state.firstName}
						placeholderTextColor='#ffff'
						style={styles.loginBox}
						maxLength={8}
						onChangeText={(text) => {
							this.setState({ firstName: text });
						}}
					/>
					<TextInput
						placeholder='Last Name'
						value={this.state.lastName}
						placeholderTextColor='#ffff'
						style={styles.loginBox}
						onChangeText={(text) => {
							this.setState({ lastName: text });
						}}
					/>
					<TextInput
						placeholder='Address'
						placeholderTextColor='#ffff'
						style={styles.loginBox}
						onChangeText={(text) => {
							this.setState({ address: text });
						}}
						value={this.state.address}
					/>
					<TextInput
						placeholder='Contact'
						value={this.state.contact}
						placeholderTextColor='#ffff'
						style={styles.loginBox}
						onChangeText={(text) => {
							this.setState({ contact: text });
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loginBox: {
		width: 300,
		height: 40,
		borderBottomWidth: 1.5,
		borderColor: '#ff8a65',
		fontSize: 20,
		margin: 10,
		color: '#ffffff',
		paddingLeft: 10,
	},
});
