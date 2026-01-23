/**
 * @file StatCard component
 * @description Glassmorphism stat card with animated count-up
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

/**
 * Props for StatCard component
 */
export interface StatCardProps {
  /** The numeric value to display */
  value: number;
  /** Label text below the value */
  label: string;
  /** Whether to display as percentage */
  isPercentage?: boolean;
  /** Whether to animate the count-up */
  animate?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Optional icon emoji */
  icon?: string;
  /** Optional custom color for value */
  valueColor?: string;
}

/**
 * Glassmorphism stat card with animated count-up
 */
export function StatCard({
  value,
  label,
  isPercentage = false,
  animate = true,
  animationDuration = 1000,
  icon,
  valueColor,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animated count-up effect
  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    // Reset if value changes
    setDisplayValue(0);
    animatedValue.setValue(0);

    // Start count-up animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(eased * value);

      setDisplayValue(currentValue);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayValue(value);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [value, animate, animationDuration, animatedValue]);

  return (
    <View
      className="flex-1 bg-gray-800/50 rounded-2xl p-4 mx-1 items-center border border-gray-700/50"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }} // Glassmorphism fallback
    >
      {/* Optional Icon */}
      {icon && (
        <Text className="text-2xl mb-2">{icon}</Text>
      )}

      {/* Large Value Display */}
      <Text
        className="text-3xl font-bold"
        style={{ color: valueColor || '#FFFFFF' }}
      >
        {displayValue}
        {isPercentage && <Text className="text-xl">%</Text>}
      </Text>

      {/* Label */}
      <Text className="text-gray-400 text-sm mt-1 text-center">
        {label}
      </Text>
    </View>
  );
}

export default StatCard;
