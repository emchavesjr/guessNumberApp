import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude)
	} else {
		return rndNum
	}
}

const renderListItem = (listLength, itemData) => (
	<View key={listLength} style={styles.listItem}>
		<Text style={DefaultStyles.body}>#{listLength - itemData.index}</Text>
		<Text style={DefaultStyles.body}>{itemData.item}</Text>
	</View>
)

export default function GameScreen(props) {

	const initialGuess = generateRandomBetween(1, 100, props.userChoice)
	const [currentGuess, setCurrentGuess] = useState(initialGuess)
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
	const currentLow = useRef(1)
	const currentHigh = useRef(100)

	const { userChoice, onGameOver } = props

	useEffect(() => {
		if (currentGuess === userChoice) {	
			onGameOver(pastGuesses.length)
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = direction => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) || 
			(direction === 'greater' && currentGuess > props.userChoice)) {	
			Alert.alert("Não minta!", "Você sabe que isso é errado...", [
				{ text: 'Desculpa!', style: 'cancel' }	
			])
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess
		} else {
			currentLow.current = currentGuess + 1
		}
		const nextNumber = generateRandomBetween(
							currentLow.current, 
							currentHigh.current, 
							currentGuess)
		setCurrentGuess(nextNumber)
		// setRounds(curRounds => curRounds + 1)
		setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Palpite do Oponente</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton styles={{...styles.button, backgroundColor:'#e0220f'}} 
					onPress={() => nextGuessHandler('lower')} >
					<Ionicons name="md-remove" size={24} color="white"/>		
				</MainButton>
				<MainButton styles={{...styles.button, backgroundColor:'#3875f6'}} 
					onPress={() => nextGuessHandler('greater')} >
					<Ionicons name="md-add" size={24} color="white"/>		
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
			{/*<ScrollView contentContainerStyle={styles.list}>
				{pastGuesses.map((guess, index) => (
					renderListItem(guess, pastGuesses.length - index)	
				))}	
			</ScrollView>*/}
				<FlatList 
					keyExtractor={(item) => item} 
					data={pastGuesses} 
					renderItem={renderListItem.bind(this, pastGuesses.length)} 
					contentContainerStyle={styles.list}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	button: {
		width: 130,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 350,
		maxWidth: '90%'
	},
	listContainer: {
		flex: 1,                     // Add to fix scrolling in Android
		width: '60%'
	},
	list: {
		// alignItems: 'center',
		justifyContent: 'flex-end',
		flexGrow: 1,
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	}
})
