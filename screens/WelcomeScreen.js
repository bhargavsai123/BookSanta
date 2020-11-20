/** @format */

import React, { Component, Fragment } from 'react';
import {
	View,
	StyleSheet,
	StatusBar,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	Alert,
	Modal,
	ScrollView,
	KeyboardAvoidingView,
	SafeAreaView,
	Platform,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import SantaAnimation from '../components/SantaClaus';

export default class WelcomeScreen extends Component {
	constructor() {
		super();
		this.state = {
			emailId: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
			contact: '',
			confirmPassword: '',
			isModalVisible: false,
		};
	}
	showModal = () => {
		return (
			<Modal
				animationType='slide'
				transparent={true}
				visible={this.state.isModalVisible}>
				<View style={styles.centeredView}>
					<ScrollView style={styles.modalView}>
						<Text style={[styles.title, { fontSize: 35 }]}>
							Create your Account
						</Text>
						<KeyboardAvoidingView>
							<TextInput
								placeholder='First Name'
								placeholderTextColor='#ffff'
								style={styles.loginBox}
								maxLength={8}
								onChangeText={(text) => {
									this.setState({ firstName: text });
								}}
							/>
							<TextInput
								placeholder='Last Name'
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
							/>
							<TextInput
								placeholder='Contact'
								placeholderTextColor='#ffff'
								style={styles.loginBox}
								onChangeText={(text) => {
									this.setState({ contact: text });
								}}
							/>
							<TextInput
								placeholder='Email ID'
								placeholderTextColor='#ffff'
								keyboardType='email-address'
								style={styles.loginBox}
								onChangeText={(text) => {
									this.setState({ emailId: text.toLowerCase() });
								}}
							/>
							<TextInput
								placeholder='Password'
								placeholderTextColor='#ffff'
								secureTextEntry={true}
								style={styles.loginBox}
								onChangeText={(text) => {
									this.setState({ password: text });
								}}
							/>
							<TextInput
								placeholder='Confirm Password'
								placeholderTextColor='#ffff'
								secureTextEntry={true}
								style={styles.loginBox}
								onChangeText={(text) => {
									this.setState({ confirmPassword: text });
								}}
							/>
						</KeyboardAvoidingView>
						<TouchableOpacity
							style={[styles.button, { marginTop: '5%' }]}
							onPress={() => {
								this.userSignUp(
									this.state.emailId,
									this.state.password,
									this.state.confirmPassword
								);
							}}>
							<Text style={[styles.buttonText, { marginTop: '5%' }]}>
								Sign Up
							</Text>
						</TouchableOpacity>
						<Text style={[styles.buttonText, { marginTop: '5%' }]}>
							Already have an account?
						</Text>
						<TouchableOpacity
							style={{ marginTop: '2%' }}
							onPress={() => {
								this.setState({ isModalVisible: false });
							}}>
							<Text
								style={[
									styles.buttonText,
									{ textDecorationLine: 'underline', color: '#ff8a65' },
								]}>
								Click Here to Login
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</Modal>
		);
	};
	userLogin = (emailId, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(emailId, password)
			.then(() => {
				return this.props.navigation.navigate('Donate Books');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				return Alert.alert(errorMessage);
			});
	};

	userSignUp = (emailId, password, confirmPassword) => {
		if (password !== confirmPassword) {
			return Alert.alert('Password does not match');
		} else {
			firebase
				.auth()
				.createUserWithEmailAndPassword(emailId, password)
				.then(() => {
					db.collection('users').add({
						first_name: this.state.firstName,
						last_name: this.state.lastName,
						address: this.state.address,
						contact: this.state.contact,
						email_id: this.state.emailId,
					});
					return Alert.alert('User Sucessfully Added', '', [
						{
							text: 'Ok',
							onPress: () => this.setState({ isModalVisible: false }),
						},
					]);
				})
				.catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					return Alert.alert(errorMessage);
				});
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<StatusBar style='auto' backgroundColor='#F8BE85' />
					{this.showModal()}
					{/* <SantaAnimation /> */}
					<Text style={styles.title}>Book Santa</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TextInput
						style={styles.loginBox}
						placeholder='example@booksanta.com'
						placeholderTextColor='#ffff'
						keyboardType='email-address'
						onChangeText={(text) => {
							this.setState({
								emailId: text,
							});
						}}
					/>

					<TextInput
						style={styles.loginBox}
						secureTextEntry={true}
						placeholder='password'
						placeholderTextColor='#ffff'
						onChangeText={(text) => {
							this.setState({
								password: text,
							});
						}}
					/>
					<TouchableOpacity
						style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
						onPress={() => {
							this.userLogin(this.state.emailId, this.state.password);
						}}>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							this.setState({ isModalVisible: true });
						}}>
						<Text style={styles.buttonText}>SignUp</Text>
					</TouchableOpacity>
				</View>
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
		fontSize: 65,
		fontWeight: '300',
		paddingBottom: 30,
		color: '#ff3d00',
	},
	loginBox: {
		width: 300,
		height: 40,
		borderBottomWidth: 1   ,
		borderColor: '#ff8a65',
		fontSize: 20,
		margin: 10,
		color: '#ffffff',
		paddingLeft: 10,
	},
	button: {
		width: 300,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
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
