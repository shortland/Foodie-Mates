import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 15,
    paddingBottom: 100, // Padding to avoid hiding content behind buttons
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Header styles
  header: {
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  // Details section styles
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  detailsRow: {
    fontSize: 16,
    marginBottom: 5,
  },
  additionalInfoRow: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  detailsLabel: {
    fontWeight: 'bold',
  },
  hoursText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  rating: {
    fontSize: 16,
    color: 'blue', // Blue to indicate interactivity
    marginBottom: 5,
  },
  distanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  distanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Ensure the text takes up the full width of the parent
  },
  sponsored: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  // Menu section styles
  scrollContainer: {
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
  },
  menuTab: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedMenuTab: {
    backgroundColor: '#d0e0ff',
    borderColor: '#0000ff',
    borderWidth: 2,
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSection: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  menuSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalScrollView: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewContainer: {
    marginBottom: 15,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  fullMap: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reservationButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgb(234, 158, 53)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  reservationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
