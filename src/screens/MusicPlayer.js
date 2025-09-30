import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAudio } from "../context/AudioProvider";
import PlayerControls from "../components/PlayerControls";

export default function PlayerScreen() {
  const { currentTrack } = useAudio();

  return (
    <View style={styles.container}>
      <View style={styles.artWrap}>
        {currentTrack?.artwork ? (
          <Image source={{ uri: currentTrack.artwork }} style={styles.art} />
        ) : (
          <View style={[styles.art, styles.placeholder]} />
        )}
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>
          {currentTrack?.title || "No track selected"}
        </Text>
        <Text style={styles.artist}>{currentTrack?.artist || "—"}</Text>
      </View>
      <PlayerControls />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  artWrap: { width: "100%", alignItems: "center", marginBottom: 16 },
  art: { width: 280, height: 280, borderRadius: 16, backgroundColor: "#eee" },
  placeholder: { backgroundColor: "#ddd" },
  meta: { width: "100%", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 20, fontWeight: "700" },
  artist: { marginTop: 4, color: "#666" },
});
