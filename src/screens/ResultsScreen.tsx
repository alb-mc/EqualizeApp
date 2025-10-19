import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';
import AppHeader from '../components/AppHeader';
import NextProcedureSection from '../components/NextProcedureSection';
import { layout } from '../theme/layout';
import { easeNextLayout } from '../utils/animations';
import Icon from '../design-system/Icon';

export default function ResultsScreen() {
  const { navigate, goBack } = useRouter();
  const [headerH, setHeaderH] = React.useState(0);
  const [floatH, setFloatH] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const spacerHeight = headerH + floatH + 16;
  const floatTop = headerH - 6;

  const images = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop'
  ];

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        greeting="Olá,"
        name="Usuário!"
        onPressMessages={() => navigate('Messages')}
        onPressProfile={() => navigate('Account')}
        onLayout={(e) => { easeNextLayout(); setHeaderH(e.nativeEvent.layout.height); }}
        includeSpacer={true}
      />

      {/* Contêiner flutuante transparente - mesmo da MainScreen */}
      <View
        style={[styles.floatingCard, { top: floatTop }]}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          easeNextLayout();
          setFloatH(h);
        }}
      >
        <NextProcedureSection
          title="Resultados"
          dateLabel="Resultados até 21/05/2025"
          name="Pressione sobre a imagem para ver o depois"
          customLayout={true}
        />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: 0 }]}>
        <View style={{ height: Math.max(0, spacerHeight - 130) }} />
        
        {/* Galeria de Resultados */}
        <View style={styles.galleryContainer}>
          {images.map((uri, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.imageContainer}
              onPress={() => openModal(index)}
            >
              <View style={styles.imageFrame}>
                <Image 
                  source={{ uri }}
                  style={styles.resultImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>

      {/* Modal de Imagem */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalCloseArea} 
            onPress={closeModal}
            activeOpacity={1}
          >
            <View style={styles.modalImageContainer}>
              <Image 
                source={{ uri: images[selectedImageIndex] }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline', onPress: () => navigate('Main') },
          { key: 'identity', label: 'Identidade', customIcon: 'identity', onPress: () => navigate('Account') },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical', onPress: () => navigate('Next') },
          { key: 'maint', label: 'Manutenção', icon: 'account-cog-outline', onPress: () => navigate('Maintenance') },
          { key: 'checks', label: 'Checkups', icon: 'clipboard-pulse-outline', onPress: () => navigate('Checkups') },
          { key: 'trail', label: 'Trilha', icon: 'map-marker-path', onPress: () => navigate('Trail') },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  floatingCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: layout.floatingCardRadius,
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'visible',
    paddingBottom: 0,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
    zIndex: 20,
  },
  scroll: { 
    paddingHorizontal: layout.screenPadding, 
    paddingBottom: 120 
  },
  galleryContainer: {
    gap: 16,
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageFrame: {
    width: 280,
    height: 380,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    position: 'relative',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
});