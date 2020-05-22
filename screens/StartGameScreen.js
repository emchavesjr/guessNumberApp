import React, {useState} from 'react'
import { 
	View, 
	Text, 
	StyleSheet, 
	TextInput, 
	Button, 
	TouchableWithoutFeedback, 
	Keyboard,
	Alert
} from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

import DefaultStyles from '../constants/default-styles'

export default function StartGameScreen(props) {

	const [enteredValue, setEnteredValue] = useState('')
	const [confirmed, setConfirmed] = useState(false)
	const [selectedNumber, setSelectedNumber] = useState('')
	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g), '')
	}

	const resetInputHandler = () => {
		setConfirmed(false);
		setEnteredValue('')
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue)
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Número inválido!', 
				'O número precisa estar entre 1 e 99.', 
				[{text: 'Ok', style: 'destructive', onPress: resetInputHandler}]
			)
			return
		}
		setConfirmed(true)	
		setSelectedNumber(chosenNumber)
		setEnteredValue('')
		Keyboard.dismiss()
	}

	let confirmedOutput

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text style={DefaultStyles.title}>Você escolheu</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton 
					onPress={() => props.onStartGame(selectedNumber)}
				>
					INICIAR JOGO	
				</MainButton>
			</Card>
		)
	}

	return (
		<TouchableWithoutFeedback onPress={() => {
			Keyboard.dismiss()	
		}}>
			<View style={styles.screen}>	
				<Text style={styles.title}>Começe um Novo Jogo!</Text>		
				<Card style={styles.inputContainer}>
					<Text style={DefaultStyles.title}>Escolha um Número</Text>	
					<Input 
						style={styles.input} 
						blurOnSubmit 
						autoCapitalize="none" 
						autoCorrect={false} 
						keyboardType="number-pad" // Just works on iOS
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button title="Limpar" onPress={resetInputHandler} color={Colors.accent} />
						</View>
						<View style={styles.button}>
							<Button title="Confirmar" onPress={confirmInputHandler} color={Colors.primary} />
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
	</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	button: {
		width: '50%',
	},
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
})
