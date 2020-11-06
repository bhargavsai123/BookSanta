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

export default class BookRequest extends React.Component {
	constructor() {
		super();
		this.state = {
			userId: firebase.auth().currentUser.email,
			bookName: '',
			request: '',
		};
	}
	addRequest = (bookName, request) => {
		var userId = this.state.userId;
		var requestId = this.createUniqueId();
		db.collection('requested_books').add({
			user_Id: userId,
			book_name: bookName,
			reason_request: request,
			request_Id: requestId,
		});
		this.setState({ bookName: '', request: '' });
		return Alert.alert('Request is been Added');
	};
	createUniqueId() {
		return Math.random().toString(36).substring(7);
	}
	render() {
		return (
			<View style={styles.container}>
				<MyHeader title='Request Books' navigation={this.props.navigation} />
				<StatusBar
					barStyle='auto'
					hidden={false}
					backgroundColor='#F8BE85'
					translucent={false}
					networkActivityIndicatorVisible={true}
				/>
				<Text style={styles.title}>Request a Book</Text>
				<TextInput
					placeholder='Book Name'
					placeholderTextColor='white'
					style={[styles.loginBox, { marginTop: -5, textAlign: 'center' }]}
					onChangeText={(text) => {
						this.setState({ bookName: text });
					}}
				/>
				<TextInput
					placeholder='Reason to Request the Book'
					placeholderTextColor='white'
					style={[styles.loginBox, { height: '55%', textAlignVertical: 'top' }]}
					multiline={true}
					onChangeText={(text) => {
						this.setState({ request: text });
					}}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() =>
						this.addRequest(this.state.bookName, this.state.request)
					}>
					<Text style={styles.buttonText}>Request</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8BE85',
	},
	profileContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 35,
		fontWeight: '300',
		paddingBottom: 30,
		color: '#ff3d00',
		alignSelf: 'center',
		marginTop: '2%',
	},
	loginBox: {
		width: '85%',
		height: 60,
		borderWidth: 0.5,
		borderRadius: 10,
		padding: 20,
		borderColor: '#ff8a65',
		fontSize: 20,
		marginVertical: 20,
		alignSelf: 'center',
		backgroundColor: '#fcb977',
		color: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 12,
	},
	button: {
		width: 300,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 25,
		backgroundColor: '#ff9800',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 16,
	},
	buttonText: {
		color: '#ffff',
		fontWeight: '200',
		fontSize: 20,
		textAlign: 'center',
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: '#F8BE85',
		borderRadius: 20,
		padding: 35,
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 50,
	},
});
