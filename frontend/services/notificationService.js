import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// This configures how the app handles notifications when it's running
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Asks the user for permission to send notifications
export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Failed to get push notification permission!');
    return false;
  }
  return true;
};

// Schedules the pre-punch-out warning
export const schedulePunchOutNotification = async (punchInTime) => {
  const nineHoursInMillis = 9 * 60 * 60 * 1000;
  const tenMinutesInMillis = 10 * 60 * 1000;

  const punchInDate = new Date(punchInTime);
  const shiftEndDate = new Date(punchInDate.getTime() + nineHoursInMillis);
  
  // Calculate the trigger time: 10 minutes before the shift ends
  const triggerDate = new Date(shiftEndDate.getTime() - tenMinutesInMillis);
  
  // For testing, you can schedule it for 10 seconds from now instead
  // const triggerDate = new Date(Date.now() + 10 * 1000);

  // Check if the trigger time is in the future
  if (triggerDate > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Shift Ending Soon!",
        body: 'Your 9-hour shift ends in 10 minutes.',
      },
      trigger: triggerDate,
    });
    console.log('Notification scheduled for:', triggerDate);
  }
};
