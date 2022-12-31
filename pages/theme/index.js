import {FlatList, View, Text} from 'react-native';
import Header from '../../components/header';
import {Button} from '../../components';
import styles from '../../styles';
import {useTheme} from '@react-navigation/native';
import t from '../../localization';
import {boxShadow, textStyle} from '../../mixin';

const themes = [
  {
    id: 1,
    theme: 'light',
    color: '#fff3e3',
    buttonColor: '#67a9ef',
    text: '#FFFFFF',
  },
  {
    id: 2,
    theme: 'yellowish',
    color: '#F7F2BD',
    buttonColor: '#F0D773',
    text: '#FFFFFF',
  },
  {
    id: 3,
    theme: 'ocean',
    color: '#67a9ef',
    buttonColor: '#fff3e3',
    text: 'black',
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
  
  console.log('p', props);

  const goToDashboard = () => {
    navigation.navigate('Dashboard',{
        userId: params.userId,
    })
  }

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
          <Button theme={colors} text={t.gem} onPress={goToDashboard}/>
        </View>
      </View>
    </View>
  );
};

export default Themes;
