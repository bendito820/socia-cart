import React from "react";
import { Text } from "react-native";

function SectionSeparator(props) {
  return (
    <Text
      style={{
        height: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        marginVertical: 20,
      }}
    />
  );
}

export default SectionSeparator;
