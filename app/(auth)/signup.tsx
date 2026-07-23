import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const Signup = () => {
	return (
		<View>
			<Text>Signup</Text>
			<Link href="/(auth)/signup">
			</Link>
		</View>
	);
};

export default Signup;
