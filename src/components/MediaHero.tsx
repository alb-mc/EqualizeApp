import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import Icon from '../design-system/Icon';
let Video: any = null;
let ResizeMode: any = { COVER: 'cover' };
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const av = require('expo-av');
  Video = av.Video;
  ResizeMode = av.ResizeMode;
} catch {}

type Props = {
  uri: string;
  videoUri?: string;
  loop?: boolean;
  muted?: boolean;
};

export default function MediaHero({ uri, videoUri, loop = true, muted = true }: Props) {
  const ref = React.useRef<any>(null);
  const [playing, setPlaying] = React.useState(false);
  const onToggle = async () => {
    if (!videoUri) return;
    const status = await ref.current?.getStatusAsync();
    if (status && 'isPlaying' in status && status.isPlaying) {
      await ref.current?.pauseAsync();
      setPlaying(false);
    } else {
      await ref.current?.playAsync();
      setPlaying(true);
    }
  };
  return (
    <View style={styles.container}>
    {videoUri && Video ? (
        <Video
          ref={ref}
          source={{ uri: videoUri }}
          style={styles.image}
          resizeMode={ResizeMode.COVER}
      isLooping={loop}
      shouldPlay={false}
      isMuted={muted}
        />
      ) : (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.overlay}>
        <TouchableOpacity onPress={onToggle} activeOpacity={0.8} disabled={!videoUri}>
          <View style={styles.playButton}>
            <Icon name={playing ? 'pause' : 'play'} size={28} color={colors.navText} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.cardOutline,
  },
  image: { width: '100%', height: 220 },
  overlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  playButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
});
