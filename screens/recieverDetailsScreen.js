/** @format */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppStackNavigator } from '../components/appStackNavigator';
import db from '../config';
import { Card } from 'react-native-elements';

export default class RecieverDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: firebase.auth().currentUser.email,
			recieverId: this.props.navigation.getParam('details')['user_Id'],
			requestId: this.props.navigation.getParam('details')['request_Id'],
			bookName: this.props.navigation.getParam('details')['book_name'],
			reason: this.props.navigation.getParam('details')['reason_request'],
			recieverName: '',
			recieverContact: '',
			recieverAddress: '',
			recieverRequestdocId: '',
		};
	}
	getRecieverDetails() {
		db.collection('users')
			.where('email_Id', '==', this.state.recieverId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						recieverName: doc.data().first_name,
						recieverContact: doc.data().contact,
						recieverAddress: doc.data().address,
					});
				});
			});
	}
	updateBookStatus = () => {
		db.collection('all_donations').add({
			book_name: this.state.bookName,
			request_Id: this.state.requestId,
			recieverName: this.state.recieverName,
			userId: this.state.userId,
		});
	};
	componentDidMount() {
		this.getRecieverDetails();
		console.log('hi');
	}
	render() {
		return (
			<View>
				<View style={{ flex: 0.3 }}>
					<Card title={'Book Information'}></Card>
					<Card>
						<Text>Name : {this.state.bookName}</Text>
					</Card>
					<Card>
						<Text>Reason : {this.state.reason}</Text>
					</Card>
				</View>
				<View>
					<Card title={'Reciever Information'}>
						<Card>
							<Text></Text>
						</Card>
					</Card>
				</View>
			</View>
		);
	}
}
