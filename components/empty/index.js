import {StyleSheet, Text, View} from 'react-native';
import Arrow from '../../assets/arrow';
import {textStyle} from '../../mixin';

const styles = StyleSheet.create({
  title: {
    ...textStyle('500', 25, 38),
    letterSpacing: 4,
    textAlign: 'center',
  },
  description: {
    ...textStyle('300', 20, 30),
    letterSpacing: 4,
    textAlign: 'center',
    marginLeft: 22,
    marginTop: 19,
    marginRight: 22,
  },
  container: {
    marginTop: 40,
  },
});

const EmptyMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kom i gang</Text>
      <Text style={styles.description}>
        Tryk på plusset i hjørnet for at oprette en opgave
      </Text>
      <Arrow
        style={{
          top: 30,
          left: 120,
        }}
      />
    </View>
  );
};

export default EmptyMessage;
