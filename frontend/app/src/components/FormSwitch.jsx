import React from "react";
import { View, Text, Switch } from "react-native";

const FormSwitch = ({
  title,
  value,
  onValueChange,
  options = ["Option 1", "Option 2"], // Default options
  otherStyles,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center justify-between">
        <Text className="text-white font-psemibold text-base">
          {value ? options[1] : options[0]}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormSwitch;
