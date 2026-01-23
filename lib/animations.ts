/**
 * @file Micro-interaction animations
 * @description Reusable animation hooks and utilities for SHEED
 */

import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Animation configuration
 */
const ANIMATION_CONFIG = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  },
};

/**
 * Hook for button press scale animation
 * Provides pressIn/pressOut handlers for tactile feedback
 */
export function usePressAnimation(scale = 0.95) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(animatedScale, {
      toValue: scale,
      ...ANIMATION_CONFIG.spring,
    }).start();
  }, [animatedScale, scale]);

  const pressOut = useCallback(() => {
    Animated.spring(animatedScale, {
      toValue: 1,
      ...ANIMATION_CONFIG.spring,
    }).start();
  }, [animatedScale]);

  const pressableStyle = {
    transform: [{ scale: animatedScale }],
  };

  return {
    pressIn,
    pressOut,
    pressableStyle,
    animatedValue: animatedScale,
  };
}

/**
 * Hook for heart bounce animation (success, like, match)
 * Bounces with scale and optional rotation
 */
export function useHeartBounce() {
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;

  const bounce = useCallback(() => {
    // Reset values
    animatedScale.setValue(1);
    animatedRotation.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.spring(animatedScale, {
          toValue: 1.3,
          tension: 200,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(animatedScale, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(animatedRotation, {
          toValue: -0.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animatedRotation, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animatedRotation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [animatedScale, animatedRotation]);

  const heartStyle = {
    transform: [
      { scale: animatedScale },
      { rotate: animatedRotation.interpolate({
        inputRange: [-0.1, 0.1],
        outputRange: ['-10deg', '10deg'],
      })},
    ],
  };

  return {
    bounce,
    heartStyle,
    animatedScale,
    animatedRotation,
  };
}

/**
 * Hook for pulse animation (notifications, badges)
 */
export function usePulse(minOpacity = 0.6) {
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const animatedScale = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  const startPulse = useCallback(() => {
    pulseLoop.current = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(animatedOpacity, {
            toValue: minOpacity,
            duration: ANIMATION_CONFIG.slow,
            useNativeDriver: true,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: ANIMATION_CONFIG.slow,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedScale, {
            toValue: 1.05,
            duration: ANIMATION_CONFIG.slow,
            useNativeDriver: true,
          }),
          Animated.timing(animatedScale, {
            toValue: 1,
            duration: ANIMATION_CONFIG.slow,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulseLoop.current.start();
  }, [animatedOpacity, animatedScale, minOpacity]);

  const stopPulse = useCallback(() => {
    pulseLoop.current?.stop();
    animatedOpacity.setValue(1);
    animatedScale.setValue(1);
  }, [animatedOpacity, animatedScale]);

  const pulseStyle = {
    opacity: animatedOpacity,
    transform: [{ scale: animatedScale }],
  };

  return {
    startPulse,
    stopPulse,
    pulseStyle,
  };
}

/**
 * Hook for fade in/out animation
 */
export function useFade(initialVisible = false) {
  const animatedOpacity = useRef(new Animated.Value(initialVisible ? 1 : 0)).current;

  const fadeIn = useCallback((duration = ANIMATION_CONFIG.normal) => {
    return new Promise<void>((resolve) => {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => resolve());
    });
  }, [animatedOpacity]);

  const fadeOut = useCallback((duration = ANIMATION_CONFIG.normal) => {
    return new Promise<void>((resolve) => {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => resolve());
    });
  }, [animatedOpacity]);

  const fadeStyle = {
    opacity: animatedOpacity,
  };

  return {
    fadeIn,
    fadeOut,
    fadeStyle,
    animatedOpacity,
  };
}

/**
 * Hook for slide animation (modal, drawer, toast)
 */
export function useSlide(direction: 'up' | 'down' | 'left' | 'right' = 'up', distance = 100) {
  const animatedValue = useRef(new Animated.Value(distance)).current;

  const getTransform = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { translateY: animatedValue };
      case 'left':
      case 'right':
        return { translateX: animatedValue };
    }
  };

  const slideIn = useCallback((duration = ANIMATION_CONFIG.normal) => {
    return new Promise<void>((resolve) => {
      Animated.spring(animatedValue, {
        toValue: 0,
        ...ANIMATION_CONFIG.spring,
      }).start(() => resolve());
    });
  }, [animatedValue]);

  const slideOut = useCallback((duration = ANIMATION_CONFIG.normal) => {
    return new Promise<void>((resolve) => {
      Animated.timing(animatedValue, {
        toValue: direction === 'down' || direction === 'right' ? distance : -distance,
        duration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => resolve());
    });
  }, [animatedValue, direction, distance]);

  const slideStyle = {
    transform: [getTransform()],
  };

  return {
    slideIn,
    slideOut,
    slideStyle,
    animatedValue,
  };
}

/**
 * Hook for shake animation (error feedback)
 */
export function useShake() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const shake = useCallback(() => {
    animatedValue.setValue(0);

    Animated.sequence([
      Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [animatedValue]);

  const shakeStyle = {
    transform: [{ translateX: animatedValue }],
  };

  return {
    shake,
    shakeStyle,
    animatedValue,
  };
}

/**
 * Hook for success celebration animation
 * Combines scale, rotation, and opacity
 */
export function useSuccessAnimation() {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;

  const celebrate = useCallback(() => {
    // Reset
    animatedScale.setValue(0);
    animatedOpacity.setValue(0);
    animatedRotation.setValue(0);

    Animated.parallel([
      Animated.spring(animatedScale, {
        toValue: 1,
        tension: 150,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(animatedRotation, {
          toValue: 360,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
    ]).start();
  }, [animatedScale, animatedOpacity, animatedRotation]);

  const successStyle = {
    opacity: animatedOpacity,
    transform: [
      { scale: animatedScale },
      { rotate: animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
      })},
    ],
  };

  return {
    celebrate,
    successStyle,
    celebration: celebrate, // alias
  };
}

/**
 * Hook for confetti-like particle animation
 * Creates multiple animated particles
 */
export function useConfetti(particleCount = 20) {
  const particles = useRef(
    Array.from({ length: particleCount }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
      rotation: new Animated.Value(0),
    }))
  ).current;

  const trigger = useCallback(() => {
    particles.forEach((particle, index) => {
      // Reset
      particle.translateX.setValue(0);
      particle.translateY.setValue(0);
      particle.opacity.setValue(0);
      particle.scale.setValue(0);
      particle.rotation.setValue(0);

      // Random direction
      const angle = (Math.random() * Math.PI * 2);
      const distance = 50 + Math.random() * 100;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance - 50; // Bias upward
      const delay = index * 30;

      Animated.parallel([
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(particle.translateX, {
              toValue: endX,
              duration: 800,
              useNativeDriver: true,
              easing: Easing.out(Easing.ease),
            }),
            Animated.timing(particle.translateY, {
              toValue: endY,
              duration: 800,
              useNativeDriver: true,
              easing: Easing.out(Easing.ease),
            }),
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.delay(500),
              Animated.timing(particle.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ]),
            Animated.spring(particle.scale, {
              toValue: 1,
              tension: 100,
              friction: 5,
              useNativeDriver: true,
            }),
            Animated.timing(particle.rotation, {
              toValue: Math.random() * 720 - 360,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start();
    });
  }, [particles]);

  const confettiStyles = particles.map((particle) => ({
    opacity: particle.opacity,
    transform: [
      { translateX: particle.translateX },
      { translateY: particle.translateY },
      { scale: particle.scale },
      { rotate: particle.rotation.interpolate({
        inputRange: [-360, 360],
        outputRange: ['-360deg', '360deg'],
      })},
    ],
  }));

  return {
    trigger,
    confettiStyles,
    particleCount,
    confetti: trigger, // alias
  };
}

/**
 * Pre-configured animation presets
 */
export const AnimationPresets = {
  buttonPress: { scale: 0.95 },
  cardPress: { scale: 0.98 },
  gentlePress: { scale: 0.99 },
  bounce: { tension: 100, friction: 5 },
  snappy: { tension: 200, friction: 8 },
  smooth: { tension: 80, friction: 10 },
};
