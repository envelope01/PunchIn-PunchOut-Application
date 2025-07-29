import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './Timer.styles';

const Timer = ({ punchInTime }) => {
  // Renamed state for clarity
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const punchInDate = new Date(punchInTime);
      const now = new Date();

      // Calculate the difference from punch-in time to now
      const difference = now.getTime() - punchInDate.getTime();

      if (difference > 0) {
        // This logic correctly calculates the elapsed time
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Format to always show two digits (e.g., 09 instead of 9)
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        setTimeElapsed(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      }
    };

    // Set an interval to update the timer every second
    const interval = setInterval(calculateTimeElapsed, 1000);

    // Clear the interval when the component is unmounted to prevent memory leaks
    return () => clearInterval(interval);
  }, [punchInTime]);

  return (
    <View style={styles.container}>
      {/* Changed the label to reflect the new functionality */}
      <Text style={styles.label}>Time Elapsed</Text>
      <Text style={styles.timerText}>{timeElapsed}</Text>
    </View>
  );
};

export default Timer;
