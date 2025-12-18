import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  denied?: boolean;
};

export default function TerminalInput({
  value,
  onChangeText,
  placeholder,
  editable = true,
  secureTextEntry = false,
  showPassword = false,
  denied = false,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [selection, setSelection] = useState({
    start: value.length,
    end: value.length,
  });

  /* cursor piscando */
  const caretOpacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(caretOpacity, {
          toValue: 0,
          duration: 520,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(caretOpacity, {
          toValue: 1,
          duration: 520,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [caretOpacity]);

  const displayValue = useMemo(() => {
    if (secureTextEntry && !showPassword) {
      return "•".repeat(value.length);
    }
    return value;
  }, [value, secureTextEntry, showPassword]);

  const caretIndex = Math.min(selection.start, displayValue.length);
  const left = displayValue.slice(0, caretIndex);
  const right = displayValue.slice(caretIndex);

  return (
    <View style={[styles.row, denied && styles.rowDenied]}>
      {/* TEXTO VISÍVEL (terminal fake) */}
      <Text
        numberOfLines={1}
        style={[styles.text, denied && styles.textDenied]}
      >
        {displayValue.length === 0 && !focused && placeholder ? (
          <Text style={styles.placeholder}>{placeholder}</Text>
        ) : (
          <>
            {left}
            {focused && (
              <Animated.Text
                style={[
                  styles.caret,
                  { opacity: caretOpacity },
                  denied && styles.caretDenied,
                ]}
              >
                ▮
              </Animated.Text>
            )}
            {right}
          </>
        )}
      </Text>

      {/* INPUT INVISÍVEL */}
      <TextInput
        style={styles.hiddenInput}
        underlineColorAndroid="transparent"
        selectionColor="transparent"
        cursorColor="transparent"
        caretHidden
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        autoCorrect={false}
        autoComplete="off"
        spellCheck={false}
        selection={selection}
        onSelectionChange={(e) =>
          setSelection(e.nativeEvent.selection)
        }
        onFocus={() => {
          setFocused(true);
          setSelection({ start: value.length, end: value.length });
        }}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#00ff88",
    marginBottom: 16,
    paddingVertical: 8,
  },
  rowDenied: {
    borderBottomColor: "#ff4d4d",
  },

  text: {
    fontFamily: "VGA",
    fontSize: 12,
    color: "#00ff88",
  },
  textDenied: {
    color: "#ff6b6b",
  },

  placeholder: {
    color: "#0d3d27",
  },

  caret: {
    color: "#00ff88",
    fontFamily: "VGA",
  },
  caretDenied: {
    color: "#ff6b6b",
  },

  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,         
    zIndex: 10,
  },
});
