import { useEffect } from "react";
import { Audio } from "expo-av";

export function useCainBootSound() {
  useEffect(() => {
    let sound: Audio.Sound | null = null;

    (async () => {
      try {
        const res = await Audio.Sound.createAsync(
          require("../../assets/sounds/boot.mp3"),
          { volume: 0.25 }
        );
        sound = res.sound;
        await sound.playAsync();
      } catch {
        // sem som se não tiver o arquivo
      }
    })();

    return () => {
      sound?.unloadAsync?.();
    };
  }, []);
}
