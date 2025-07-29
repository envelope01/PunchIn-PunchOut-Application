    import { StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        marginBottom: 30,
      },
      label: {
        fontSize: 16,
        color: '#A0AEC0',
        marginBottom: 8,
      },
      timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2D3748',
        fontVariant: ['tabular-nums'], // Ensures numbers don't jump around
      },
    });

    export default styles;
    