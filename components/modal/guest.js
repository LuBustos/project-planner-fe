import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Lock from '../../assets/lock';
import Button from '../button';
import {textStyle} from '../../mixin';
import {useNavigation} from '@react-navigation/native';
import t from '../../localization';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    width: 315,
    height: 636,
    marginTop: 70,
    alignSelf: 'center',
  },
  title: {
    ...textStyle('700', 40, 60),
    letterSpacing: 4,
    textAlign: 'center',
    color: '#000000',
    marginTop: 34,
    marginBottom: 8,
  },
  text: {
    ...textStyle('500', 14, 21),
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
});

const GuestModal = ({visible, onClose, theme}) => {
  const {navigate} = useNavigation();

  const goToLoginScreen = isCreateAccount => {
    navigate('Login', {
      isCreateAccount: isCreateAccount,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{t.hov} </Text>
        </View>
        <View>
          <Text style={styles.text}>
            {t.guest_subt}
          </Text>
        </View>
        <View style={{margin: 50}}>
          <Lock
            style={{
              left: 35,
            }}
          />
        </View>
        <View style={{alignSelf: 'center', marginBottom: 25}}>
          <Button
            theme={theme}
            text={t.opret_bruger}
            onPress={() => goToLoginScreen(true)}
          />
        </View>
        <View>
          <Text style={{...styles.text, marginBottom: 8}}>
            {t.c_guest}
          </Text>
          <Text style={styles.text}>
            {t.log_ind}{' '}
            <Text
              onPress={() => goToLoginScreen(false)}
              style={{...styles.text, color: '#67A9EF'}}>
              {t.here}
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default GuestModal;
