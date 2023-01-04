import {StyleSheet, Text, View} from 'react-native';
import {textStyle} from '../../mixin';
import t from '../../localization';
import Approved from '../../assets/Approved';

const styles = StyleSheet.create({
  title: {
    ...textStyle('500', 16, 24),
    letterSpacing: 1,
    textAlign: 'center',
  },
  description: {
    ...textStyle('400', 13, 19),
    letterSpacing: 1,
    textAlign: 'center',
    marginLeft: 22,
    marginTop: 19,
    marginRight: 22,
  },
  container: {
    marginTop: 40,
    width: 356.5
  },
});

const CompleteAllTaskMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.complete_dashboard_title}</Text>
      <Text style={styles.description}>{t.complete_dashboard_desc}</Text>
      <Approved
        style={{
          top: 30,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default CompleteAllTaskMessage;
