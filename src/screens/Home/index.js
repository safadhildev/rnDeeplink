/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Linking,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {APP_VERSION} from '@env';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';
import {CustomInput, CustomTextArea, Line} from '../../components';
import {randomString} from '../../utils';
import CustomPicker from '../../components/CustomPicker';
import ReactNativeModal from 'react-native-modal';

const schemes = [
  {
    label: 'https',
    value: 'https',
  },
  {
    label: 'rndeeplink',
    value: 'rndeeplink',
  },
];

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  generateButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#ffa611',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    paddingVertical: 5,
    marginVertical: 10,
  },
  generateButtonText: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 16,
    color: '#FFF',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 14,
  },
  sectionTitleWrapper: {
    backgroundColor: '#131418',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginHorizontal: -10,
  },
  subtitle: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#37474F',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#CFD8DC',
    borderRadius: 5,
    marginBottom: 20,
  },
  textWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

const useMount = func => useEffect(() => func(), []);
const useInitialURL = () => {
  const [url, setUrl] = useState(null);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      setTimeout(() => {
        setUrl(initialUrl);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url};
};

const defaultDomain = 'deeplinkexample00.web.app';
const defaultScheme = 'https';
const copyText = 'Click on text above to copy';

const Home = ({navigation, route}, ...props) => {
  const {url: initialUrl} = useInitialURL();
  const [code, setCode] = useState('');
  const [deeplink, setDeeplink] = useState(initialUrl);
  const [dynamicLink, setDynamicLink] = useState(null);
  const [copyKey, setCopyKey] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(defaultScheme);
  const [scheme, setScheme] = useState(selectedScheme);
  const [domain, setDomain] = useState(defaultDomain);
  const [inputLink, setInputLink] = useState(null);
  const [completeLink, setCompleteLink] = useState(
    `${defaultScheme}://${defaultDomain}`,
  );
  const [showQRModal, setShowQRModal] = useState(false);

  const _handleDeepLink = link => {
    console.log('Home - _handleDeepLink :: ', link);
    setDeeplink(link?.url);
  };

  const _handleDynamicLink = link => {
    console.log('Home - _handleDynamicLink :: ', link);
    setDynamicLink(link?.url);
  };

  useEffect(() => {
    if (inputLink?.length > 0) {
      setCompleteLink(inputLink);
    } else {
      setCompleteLink(`${selectedScheme}://${domain}/?code=${code}`);
    }
  }, [domain, selectedScheme, code, inputLink]);

  useEffect(() => {
    setCode(randomString(10));
  }, []);

  // React Native Linking from Quit State
  useEffect(() => {
    if (initialUrl) {
      _handleDeepLink({url: initialUrl});
    }
  }, [initialUrl]);

  // rnFirebase Dynamic Links from Quit State
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(_handleDynamicLink)
      .catch(err => {
        Alert.alert('Error! [rnFirebase Dynamic Links] ', err?.toString);
        console.log('Home - rnFirebase Dynamic Links - error :: ', err);
      });
  }, []);

  // React Native Linking listener
  useEffect(() => {
    const unsubscribe = Linking.addEventListener('url', _handleDeepLink);
    return () => unsubscribe.remove();
  }, []);

  // rnFirebase Dynamic Links listener
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(_handleDynamicLink);
    return () => unsubscribe();
  }, []);

  const _handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  const _handleCopy = value => {
    if (value) {
      Clipboard.setString(value);
      Toast.show('Copied!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#757575',
      });
    }
  };

  const _renderTitle = text => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Line />
        </View>
        <View>
          <Text style={styles.title}>{text}</Text>
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Line />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: 150,
          right: -50,
          top: 0,
          paddingLeft: 25,
          backgroundColor: '#1976D2',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
          transform: [{rotate: '45deg'}],
        }}>
        <Text style={{textAlign: 'center', color: '#FFF'}}>{APP_VERSION}</Text>
      </View>
      <ReactNativeModal
        isVisible={showQRModal}
        style={{margin: 0}}
        onBackButtonPress={_handleCloseQRModal}
        onBackdropPress={_handleCloseQRModal}>
        <View style={{width: '100%', alignItems: 'center'}}>
          {completeLink && <QRCode value={completeLink} size={300} />}
        </View>
      </ReactNativeModal>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          {_renderTitle('RN Deep Link Example')}
          <View>
            <CustomTextArea
              label="Deeplink resolved via React Native Linking"
              value={deeplink || '-'}
              onPress={() => {
                _handleCopy(deeplink);
              }}
              hint={copyText}
            />
          </View>
          <View style={{marginTop: 30}}>
            <CustomTextArea
              label="Deeplink read via rnFirebase.io Dynamic Links"
              value={dynamicLink || '-'}
              onPress={() => {
                _handleCopy(dynamicLink);
              }}
              hint={copyText}
            />
          </View>

          <View style={{marginTop: 50}}>{_renderTitle('Create a link')}</View>
          <CustomTextArea
            label="Preview"
            hint={copyText}
            value={completeLink}
            onPress={() => {
              _handleCopy(completeLink);
            }}
          />

          {completeLink && (
            <TouchableOpacity
              onPress={() => {
                setShowQRModal(true);
              }}>
              <QRCode value={completeLink} size={100} />
            </TouchableOpacity>
          )}
          <CustomInput
            label="Code"
            placeholder="Code"
            value={code}
            button
            icon="shuffle"
            onButtonPress={() => {
              setCode(randomString(10));
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 2, marginRight: 5}}>
              <CustomPicker
                data={schemes}
                label="Scheme"
                selectedValue={scheme}
                onValueChange={(value, index) => {
                  setScheme(value);
                }}
              />
            </View>
            <View style={{flex: 2, marginLeft: 5}}>
              <CustomInput
                placeholder="Scheme"
                value={scheme}
                onChangeText={value => {
                  setScheme(value);
                }}
                icon="shuffle"
              />
            </View>
          </View>
          <CustomInput
            label="Domain"
            placeholder="www.something.com"
            multiline
            value={domain}
            onChangeText={value => {
              setDomain(value);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={{marginRight: 10}}>Or</Text>
            <View style={{flex: 1, marginTop: 2}}>
              <Line />
            </View>
          </View>

          <CustomInput
            label="Enter/Paste a complete link"
            placeholder="www.something.com"
            multiline
            value={inputLink}
            onChangeText={value => {
              setInputLink(value);
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 5,
            }}>
            <Text style={{marginRight: 10}}>( Advance )</Text>
            <View style={{flex: 1, marginTop: 2}}>
              <Line />
            </View>
          </View>
          <Text style={styles.subtitle}>Generate a Firebase Dynamic link</Text>
          <TouchableHighlight
            style={[styles.generateButton]}
            onPress={() => {
              navigation.navigate('FirebaseDynamicLink', {
                deeplink: completeLink,
              });
            }}>
            <Text style={styles.generateButtonText}>Dynamic Link</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
