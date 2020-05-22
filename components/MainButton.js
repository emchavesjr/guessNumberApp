import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors'

export default function MainButton(props) {
	return(
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={{...styles.button, ...props.styles}}>
				<Text style={styles.buttonText}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,	
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	buttonText: {
		color: 'white',	
		fontFamily: 'open-sans',
		fontSize: 18,
		textAlign: 'center'
	}
})