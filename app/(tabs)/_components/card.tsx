import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";
import { Text, View } from "react-native";

type CardProps = ComponentPropsWithoutRef<typeof View>;
type CardTextProps = ComponentPropsWithoutRef<typeof Text>;

function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={["bg-card text-card-foreground flex flex-col gap-6 rounded-xl border", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardProps) {
  return (
    <View
      className={[
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardTextProps) {
  return (
    <Text
      className={["text-base font-semibold leading-none", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: CardTextProps) {
  return (
    <Text
      className={["text-sm text-muted-foreground", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: CardProps) {
  return (
    <View
      className={[
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardProps) {
  return (
    <View className={["px-6", className].filter(Boolean).join(" ")} {...props} />
  );
}

function CardFooter({ className, ...props }: CardProps) {
  return (
    <View
      className={["flex flex-row items-center px-6 pb-6", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
};

