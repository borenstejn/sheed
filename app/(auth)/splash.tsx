import { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const SPLASH_DURATION = 800; // 0.8 seconds as per PRD

export default function SplashScreen() {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      // Logo fade in and scale
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      // Heart icon bounce (delayed)
      Animated.sequence([
        Animated.delay(200),
        Animated.spring(heartScale, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate after splash duration
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Heart icon with arrow */}
        <Animated.View
          style={[
            styles.heartContainer,
            { transform: [{ scale: heartScale }] },
          ]}
        >
          <Text style={styles.heart}>💘</Text>
        </Animated.View>

        {/* SHEED text with gradient effect */}
        <Text style={styles.logoText}>SHEED</Text>
        <Text style={styles.tagline}>Match your friends</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101012',
  },
  logoContainer: {
    alignItems: 'center',
  },
  heartContainer: {
    marginBottom: 16,
  },
  heart: {
    fontSize: 64,
  },
  logoText: {
    fontSize: 56,
    fontWeight: '800',
    color: '#FF3B7A',
    letterSpacing: 4,
    textShadowColor: 'rgba(255, 59, 122, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    color: '#8A8A8E',
    letterSpacing: 2,
  },
});
