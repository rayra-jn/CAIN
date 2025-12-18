import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function CainNoise() {
  const flicker = useRef(new Animated.Value(0.06)).current;
  const drift = useRef(new Animated.Value(0)).current;
  const scan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flickerAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(flicker, { toValue: 0.10, duration: 90, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.05, duration: 120, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.12, duration: 70, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.055, duration: 160, useNativeDriver: true }),
      ])
    );

    const driftAnim = Animated.loop(
      Animated.timing(drift, {
        toValue: 1,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // “scanline sweep” bem sutil
    const scanAnim = Animated.loop(
      Animated.timing(scan, {
        toValue: 1,
        duration: 2600,
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

  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -24],
  });

  const translateX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 14],
  });

  const scanTranslateY = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 820], // varre a tela (valor alto é ok)
  });

  const scanOpacity = flicker.interpolate({
    inputRange: [0.05, 0.12],
    outputRange: [0.08, 0.16],
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* 1) Grain (repeat) — precisa ser um PNG pequeno e bem aleatório */}
      <Animated.Image
        source={require("../assets/images/noise.png")}
        
        style={[
          styles.layer,
          {
            opacity: flicker,
            transform: [{ translateY }, { translateX }, { scale: 1.8 }],
          },
        ]}
      />

      {/* 2) Scanlines (cover) — NÃO repetir em blocos */}
      <Animated.Image
        source={require("../assets/images/scanlines.png")}
        resizeMode="cover"
        style={[
          styles.layer,
          {
            opacity: 0.10,
            transform: [{ scale: 1.02 }],
          },
        ]}
      />

      {/* 3) Sweep bem sutil (faixa passando) */}
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
  layer: {
    ...StyleSheet.absoluteFillObject,
  },

  // faixa de “refresh” tipo CRT, bem discreta
  sweep: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "rgba(0,255,136,0.10)",
  },
});
