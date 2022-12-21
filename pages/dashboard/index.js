import {Text, View} from 'react-native';
import Header from '../../components/header';

const Dashboard = () => {
  return (
    <View>
      <Header
        header_style={{
          left: -55,
          top: -120,
        }}
        // title={'Opret bruger'}
        // title_style={{...styles.second_title, color: colors.text}}
      />
    </View>
  );
};

export default Dashboard;
