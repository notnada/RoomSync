import * as React from "react";
import { View, ViewProps } from "react-native";

type CardProps = ViewProps & {
  children?: React.ReactNode;
  className?: string;
};

export function Card({ children, className, style, ...props }: CardProps) {
  return (
    <View className={className} style={style} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ children, className, style, ...props }: CardProps) {
  return (
    <View className={className} style={style} {...props}>
      {children}
    </View>
  );
}

export default Card;
