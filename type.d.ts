import type { ImageSourcePropType } from "react-native";

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: ImageSourcePropType;
        badgeCount?: number;
    }

    interface TabIconProps {
        focused: boolean;
        icon: ImageSourcePropType;
    }

    interface Listing {
        id: string;
        icon: ImageSourcePropType;
        title?: string;
        image?: ImageSourcePropType;
        location?: string;
        beds?: number;
        baths?: number;
        sqft?: number;
        tags?: string[];
        verified?: boolean;
        landlordName?: string;
        landlordSub?: string;
        name: string;
        plan?: string;
        category?: string;
        paymentMethod?: string;
        startDate?: string;
        price: number;
        
    }

    interface Roommate {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        age: number;
        school: string;
        location: string;
        bio: string;
        budget: string;
        moveIn: string;
        vibe: string;
        tags: string[];
    }

    interface ListingCardProps extends Omit<Listing, "id"> {
        expanded: boolean;
        onPress: () => void;
        onCancelPress?: () => void;
        isCancelling?: boolean;
    }

    interface UpcomingSubscription {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        price: number;
        currency?: string;
        daysLeft: number;
    }

    interface UpcomingSubscriptionCardProps
        extends Omit<UpcomingSubscription, "id"> {}

    interface ListHeadingProps {
        title: string;
    }
}

export { };

