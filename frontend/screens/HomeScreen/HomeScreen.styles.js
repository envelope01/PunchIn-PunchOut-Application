import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2D3748',
  },
  dateTimeContainer: {
    width: '100%', // Ensure it takes full width
    marginTop: 8,
  },
  rowContainer: {
    margin:10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between time and date
    alignItems: 'center', // Center vertically
  },
  currentTimeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  currentDateText: {
    fontSize: 16,
    color: '#718096',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
    marginBottom: 32,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#EDF2F7',
    marginVertical: 12,
  },
  actionButton: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  punchIn: {
    backgroundColor: '#6B46C1',
  },
  punchOut: {
    backgroundColor: '#E53E3E',
  },
  pressedButton: {
    opacity: 0.8,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 1,
    width: '90%',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#718096',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
  },
});
