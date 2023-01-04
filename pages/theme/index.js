import {useTheme} from '@react-navigation/native';
import {FlatList, View} from 'react-native';
import {Button} from '../../components';
import Header from '../../components/header';
import t from '../../localization';
import {boxShadow} from '../../mixin';
import styles from '../../styles';

const themes = [
  {
    id: 1,
    theme: 'light',
    color: '#fff3e3',
    buttonColor: '#67a9ef',
    text: '#FFFFFF',
    iconColor: '#67A9EF'
  },
  {
    id: 2,
    theme: 'yellowish',
    color: '#F7F2BD',
    buttonColor: '#F0D773',
    text: '#FFFFFF',
    iconColor: '#67A9EF'
  },
  {
    id: 3,
    theme: 'ocean',
    color: '#67a9ef',
    buttonColor: '#fff3e3',
    text: 'black',
    iconColor: '#fff3e3'
  },
];

const Item = ({item, handlerThemes}) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            backgroundColor: item.color,
            width: 50,
            height: 50,
            borderRadius: 150 / 2,
            ...boxShadow(8, 4, 0.17),
          }}
        />
        <Button
          onPress={() => handlerThemes(item.theme)}
          theme={{backgroundButton: item.buttonColor, text: item.text}}
          text={item.theme}
        />
      </View>
    </View>
  );
};

const Themes = ({handlerThemes, ...props}) => {
  const {colors} = useTheme();
  const {
    navigation,
    route: {params},
  } = props;

  const goToDashboard = () => {
    navigation.navigate('Dashboard', {
      userId: params.userId,
    });
  };

  return (
    <View>
      <Header
        header_style={{
          left: -55,
          top: -150,
        }}
        arrowTop={'29%'}
        height="45%"
        title={t.tema}
        title_style={{...styles.second_title, color: colors.text}}
      />
      <View style={{height: 400}}>
        <FlatList
          keyExtractor={item => item.id}
          data={themes}
          renderItem={({item}) => (
            <Item item={item} handlerThemes={handlerThemes} />
          )}
        />
        <View style={{alignSelf: 'center'}}>
          <Button theme={colors} text={t.gem} onPress={goToDashboard} />
        </View>
      </View>
    </View>
  );
};

export default Themes;
