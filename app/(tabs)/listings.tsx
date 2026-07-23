import { Link } from 'expo-router';
import { View, Text } from 'react-native';


const Listings = () => {
	return (
		<View>
            <Link href={{ pathname: "/listings/[id]", params: { id: "Kouba123" } }}>
                View Details of Kouba123
            </Link>
        </View>
	);
};

export default Listings;
