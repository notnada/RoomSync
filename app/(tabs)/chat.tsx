import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeAreaView);

const Chat = () => {
    return (
        <SafeAreaView className="flex-1 bg-background px-5">
            <Text>Chat</Text>
        </SafeAreaView>
    );
};

export default Chat;