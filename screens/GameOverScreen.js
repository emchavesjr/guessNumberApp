import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import DefaultStyles from '../constants/default-styles'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

export default function GameOverScreen(props) {
	return(
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>O Jogo acabou!</Text>		
			<View style={styles.imageContainer}>
				<Image 
					fadeDuration={300}
					source={require('../assets/success.png')} 
					//source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} 
					style={styles.image} 
					resizeMode="cover"
				/>	
			</View>
			<View style={styles.resultContainer}>
			<Text style={{...DefaultStyles.body,...styles.resultText}}>
				Seu smartphone precisou de <Text style={styles.highlight}>{props.roundsNumber}</Text> rodadas para adivinhar o número <Text style={styles.highlight}>{props.userNumber}</Text>. 
			</Text>
			</View>
			<MainButton onPress={props.onRestart}>
				NOVO JOGO
			</MainButton>
		</View>	
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 30,
	},
	image: {
		width: '100%',
		height: '100%'
	},
	resultContainer: {
		marginHorizontal: 20,
		marginVertical: 15
	},
	resultText: {
		textAlign: 'center',
		fontSize: 20
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
})
