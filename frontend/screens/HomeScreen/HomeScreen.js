import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import { getStatus, punchIn, punchOut } from '../../services/attendanceService';
import ReasonModal from '../../components/common/ReasonModal/ReasonModal';
import Timer from '../../components/dashboard/Timer/Timer';
import styles from './HomeScreen.styles';

// Helper function to format the duration
const formatDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return '--:--';
  const durationMs = new Date(endTime) - new Date(startTime);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  return `${hours}h ${minutes}m`;
};

const HomeScreen = () => {
  const [apiStatus, setApiStatus] = useState('loading');
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [summary, setSummary] = useState({ worked: '--:--', break: '--:--' });

  const fetchStatus = async () => {
    try {
      setError('');
      setApiStatus('loading');
      const response = await getStatus();
      setApiStatus(response.data.status);
      
      if (response.data.status === 'punched_in') {
        setAttendanceDetails(response.data.details);
        setSummary({ worked: '--:--', break: '--:--' }); // Reset summary while working
      } else if (response.data.status === 'completed') {
        const details = response.data.details;
        const workedTime = formatDuration(details.punch_in_time, details.punch_out_time);
        setSummary({ worked: workedTime, break: '0m' }); // Break time is static for now
      } else {
        setSummary({ worked: '--:--', break: '--:--' });
      }
    } catch (err) {
      setError('Failed to connect to the server.');
      setApiStatus('error');
    }
  };

  useEffect(() => {
    fetchStatus();
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePunchIn = async () => {
    try {
      await punchIn();
      fetchStatus();
    } catch (err) {
      console.error(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handlePunchOut = async (reason) => {
    try {
      await punchOut(reason);
      fetchStatus();
    } catch (err) {
      console.error(err.response?.data?.message || 'An error occurred.');
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Tracker</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.currentTimeText}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text style={styles.currentDateText}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {apiStatus === 'loading' ? (
          <ActivityIndicator size="large" color="#6B46C1" />
        ) : (
          <>
            <View style={styles.statusCard}>
              <Text style={styles.statusText}>
                {apiStatus === 'punched_in' ? 'Currently Working' : 'Ready to Punch'}
              </Text>

              {/* Show Timer only when punched in */}
              {apiStatus === 'punched_in' && attendanceDetails && (
                <Timer punchInTime={attendanceDetails.punch_in_time} />
              )}

              <View style={styles.divider} />
            </View>

            <Pressable 
              style={({ pressed }) => [
                styles.actionButton, 
                apiStatus === 'punched_in' ? styles.punchOut : styles.punchIn,
                pressed && styles.pressedButton
              ]}
              onPress={apiStatus === 'punched_in' ? () => setModalVisible(true) : handlePunchIn}
            >
              <Text style={styles.actionButtonText}>
                {apiStatus === 'punched_in' ? 'Punch Out' : 'Punch In'}
              </Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Today's Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Worked:</Text>
          <Text style={styles.summaryValue}>{summary.worked}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Break:</Text>
          <Text style={styles.summaryValue}>{summary.break}</Text>
        </View>
      </View>

      <ReasonModal
        visible={isModalVisible}
        onSubmit={handlePunchOut}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
