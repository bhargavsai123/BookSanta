/** @format */

import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Alert,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config';
import { ListItem, Header, Icon, Badge } from 'react-native-elements';
import MyHeader from '../components/myHeader';

export default class BookDonate extends React.Component {
	constructor() {
		super();
		this.state = {
			requestedBooksList: [],
		};
		this.requestRef = null;
	}
	getRequestedBooksList = () => {
		this.requestRef = db
			.collection('requested_books')
			.onSnapshot((snapshot) => {
				var requestedbooklist = snapshot.docs.map((document) =>
					document.data()
				);
				this.setState({ requestedBooksList: requestedbooklist });
			});
	};
	componentDidMount() {
		this.getRequestedBooksList();
	}
	componentWillUnmount() {
		this.requestRef;
	}
	keyExtractor = (item, index) => index.toString();
	renderItem = ({ item, i }) => {
		return (
			<ListItem
				key={i}
				title={item.book_name}
				subtitle={item.reason_request}
				titleStyle={{ color: '#000000', fontWeight: 'bold' }}
				rightElement={
					<TouchableOpacity
						stlye={styles.button}
						onPress={() => {
							this.props.navigation.navigate('RecieverDetails');
							console.log('hi');
						}}>
						<Text>View</Text>
					</TouchableOpacity>
				}
				bottomDivider
			/>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<MyHeader title='Donate Books' navigation={this.props.navigation} />
				<View style={{ flex: 1 }}>
					{this.state.requestedBooksList.length === 0 ? (
						<View>
							<Text>List of Requested Books</Text>
						</View>
					) : (
						<FlatList
							keyExtractor={this.keyExtractor}
							data={this.state.requestedBooksList}
							renderItem={this.renderItem}
						/>
					)}
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
