import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function CainNoise() {
  const flicker = useRef(new Animated.Value(0.06)).current;
  const drift = useRef(new Animated.Value(0)).current;
  const scan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flickerAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(flicker, { toValue: 0.09, duration: 120, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.055, duration: 180, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.11, duration: 90, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.06, duration: 200, useNativeDriver: true }),
      ])
    );

    const driftAnim = Animated.loop(
      Animated.timing(drift, {
        toValue: 1,
        duration: 6000,              // 👈 MAIS lento
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const scanAnim = Animated.loop(
      Animated.timing(scan, {
        toValue: 1,
        duration: 3200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    flickerAnim.start();
    driftAnim.start();
    scanAnim.start();

    return () => {
      flickerAnim.stop();
      driftAnim.stop();
      scanAnim.stop();
    };
  }, [flicker, drift, scan]);

  // 🔹 Drift MUITO sutil (não entorta mais)
  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 6],
  });

  const translateX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 6],
  });

  const scanTranslateY = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 900],
  });

  const scanOpacity = flicker.interpolate({
    inputRange: [0.05, 0.12],
    outputRange: [0.05, 0.12],
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* 1) Grain (noise) — FULLSCREEN */}
      <Animated.Image
        source={require("../assets/images/noise.png")}
        resizeMode="repeat"
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: flicker,
            transform: [{ translateX }, { translateY }],
          },
        ]}
      />

      {/* 2) Scanlines — FULLSCREEN (corrigido) */}
      <Animated.Image
        source={require("../assets/images/scanlines.png")}
        resizeMode="cover"
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.08,
          },
        ]}
      />

      {/* 3) Sweep (faixa CRT) */}
      <Animated.View
        style={[
          styles.sweep,
          {
            opacity: scanOpacity,
            transform: [{ translateY: scanTranslateY }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sweep: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "rgba(0,255,136,0.08)",
  },
});
