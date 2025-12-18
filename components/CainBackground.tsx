import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function CainBackground() {
  const glow = useRef(new Animated.Value(0.18)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 0.35, duration: 3200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.05, duration: 3200, useNativeDriver: true })
      ])
    ).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* base */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#020403" }]} />

      {/* glow */}
      <Animated.View
        style={[
          styles.glow,
          { opacity: glow }
        ]}
      />

      {/* scanlines */}
      <View style={styles.scanlines} />
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00ff88"
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    // scanlines simples usando sombras repetidas via gradiente “fake”
    // (sem libs externas)
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderColor: "rgba(0,255,136,0.08)",
    transform: [{ scaleY: 18 }]
  }
});
