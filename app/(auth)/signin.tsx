
import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const Signin = () => {
	return (
		<View>
			<Text>Signin</Text>
			<Link href="/(auth)/signin"></Link>
		</View>
	);
};

export default Signin;
