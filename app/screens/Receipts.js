import React from 'react';
import {requireNativeComponent} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../locales/i18n';

// Components
import BaseContainer from '../components/Global/Container';
import NavigationTitle from '../components/Global/NavigationTitle';
import NavigationIconButton from '../components/Global/NavigationIconButton';
const ReceiptsView = requireNativeComponent('ReceiptsView');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});
class Receipts extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavigationTitle title={i18n.t('receipts')} />,
    headerLeft: (
      <NavigationIconButton
        icon="arrow-back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });

  render() {
    const {navigation} = this.props;
    const receipts = navigation.getParam('receipts');

    return (
      <BaseContainer>
        <ReceiptsView receipts={receipts} style={styles.container} />
      </BaseContainer>
    );
  }
}

export default Receipts;
