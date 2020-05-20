import React from 'react';
import { View, StyleSheet } from 'react-native'

export default function Card(props) {
	return (
		<View style={{...styles.card, ...props.style}}>
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		shadowColor: '#000',                       // This 
		shadowOffset: { width: 0, height: 2},      // property
		shadowRadius: 6,                           // for
		shadowOpacity: 0.26,                       // iOS
		elevation: 5, // This one for Android
		backgroundColor: '#FFF',
		padding: 20,
		borderRadius: 10
	}
})
