/* eslint-disable react-hooks/exhaustive-deps */
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import ReactNativeModal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-root-toast';
import {CustomInput, CustomTextArea, Line} from '../../components';

const chevronIcon = require('../../../assets/circle-chevron.png');
const resetIcon = require('../../../assets/reset.png');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  generateButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    paddingVertical: 5,
  },
  generateButtonText: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 16,
    color: '#BDC3C7',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 14,
  },
  sectionTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#131418',
    // backgroundColor: '#ffa611',
    backgroundColor: '#1b72e7',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    // marginHorizontal: -10,
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
  },
});

const sampleDomainUriPrefix = 'https://testdeeplink001.page.link';
const sampleLink = 'https://deeplinkexample00.web.app/?code=1234';
// android fallback link - if app not installed
const sampleAFL =
  'https://play.google.com/store/apps/details?id%3Dco.hoolah.buynowpaylater';
// android package name
const sampleAPN = 'com.rndeeplink';
// ios build identifier
const sampleIBI = 'com.rndeeplink';
// ios store id
const sampleISI = '1516223660';
const sampleIUS = 'rndeeplink';
// ios fallback link - if app not installed
const sampleIFL =
  'https://apps.apple.com/my/app/hoolah-buy-now-pay-later/id1516223660';
const sampleEFR = 1;

const completeLink = `${sampleDomainUriPrefix}/?link=${sampleLink}&apn=${sampleAPN}&afl=${sampleAFL}&isi=${sampleISI}&ibi=${sampleIBI}&ifl=${sampleIFL}&efr=${sampleEFR}`;

const setupDomainFields = [
  {
    key: 'domainUriPrefix',
    label: 'Domain Uri Prefix',
    value: sampleDomainUriPrefix,
    type: 'input',
    keyboardType: 'default',
  },
];

const setupDeepLinkFields = [
  {
    key: 'link',
    label: 'Link',
    value: sampleLink,
    type: 'input',
    keyboardType: 'default',
  },
];

const androidFields = [
  {
    key: 'afl',
    label: 'afl - If your app is not installed, send the user to',
    value: sampleAFL,
    type: 'input',
    keyboardType: 'default',
  },
  {
    key: 'apn',
    label: 'apn - Android Package Name',
    value: sampleAPN,
    type: 'input',
    keyboardType: 'default',
  },
];

const iosFields = [
  {
    key: 'ibi',
    label: 'ibi - IOS build ID',
    value: sampleIBI,
    type: 'input',
    keyboardType: 'default',
  },
  {
    key: 'isi',
    label: 'isi - IOS Store ID',
    value: sampleISI?.toString(),
    type: 'input',
    keyboardType: 'default',
  },
  {
    key: 'ius',
    label: 'ius - IOS URL Scheme',
    value: sampleIUS,
    type: 'input',
    keyboardType: 'default',
  },
  {
    key: 'ifl',
    label: 'ifl - IOS Fallback Link',
    value: sampleIFL,
    type: 'input',
    keyboardType: 'default',
  },
];

const advanceFields = [
  {
    key: 'efr',
    label: 'Preview Page (0-show , 1-skip)',
    value: sampleEFR.toString(),
    type: 'input',
    keyboardType: 'numeric',
  },
];

const sections = [
  {
    key: '1',
    value: 'Set up your Domain',
    type: 'label',
    fields: setupDomainFields,
  },
  {
    key: '2',
    value: 'Set up Dynamic Link',
    type: 'label',
    fields: setupDeepLinkFields,
  },

  {
    key: '3',
    value: 'Define link behavior for Android',
    type: 'label',
    fields: androidFields,
  },

  {
    key: '4',
    value: 'Define link behavior for iOS',
    type: 'label',
    fields: iosFields,
  },

  {
    key: '5',
    value: 'Advance Options',
    type: 'label',
    fields: advanceFields,
  },
];

const backIcon = require('../../../assets/back.png');

const FirebaseDynamicLink = ({navigation, route}) => {
  const {deeplink} = route?.params;
  const [animatedKey, setAnimatedKey] = useState(null);
  const [copyText, setCopyText] = useState('Click on text above to copy');
  const [dynamicLinkProps, setDynamicLinkProps] = useState({
    domainUriPrefix: sampleDomainUriPrefix,
    link: deeplink || sampleLink,
    afl: sampleAFL,
    apn: sampleAPN,
    ibi: sampleIBI,
    ius: sampleIUS,
    isi: sampleISI,
    ifl: sampleIFL,
    efr: sampleEFR,
  });
  const [dynamicLink, setDynamicLink] = useState(completeLink);
  const [shortDynamicLink, setShortDynamicLink] = useState(null);
  const [activeSections, setActiveSections] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
  ]);
  const [qrCodeValue, setQRCodeValue] = useState(null);
  const [ShortDynamicLinkError, setShortDynamicLinkError] = useState(null);

  //   const _buildLongDynamicLinks = async () => {
  //     try {
  //       const link = await dynamicLinks().buildLink({
  //         link: dynamicLinkProps.link,
  //         domainUriPrefix: dynamicLinkProps.domain,
  //       });
  //       setShortDynamicLink(link);
  //       console.log({link});
  //     } catch (err) {
  //       Alert.alert('Error!', err?.toString());
  //     }
  //   };

  const _buildShortDynamicLinks = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: dynamicLinkProps?.link,
        domainUriPrefix: dynamicLinkProps?.domainUriPrefix,
        android: {
          packageName: dynamicLinkProps?.apn,
          fallbackUrl: dynamicLinkProps?.afl,
        },
        ios: {
          bundleId: dynamicLinkProps?.ibi,
          fallbackUrl: dynamicLinkProps?.ifl,
          appStoreId: dynamicLinkProps?.isi,
          customScheme: dynamicLinkProps?.ius,
        },
      });
      setShortDynamicLink(link);
      console.log({link});
    } catch (err) {
      console.log('_builShortDynamicLink - error :: ', err);
      setShortDynamicLinkError(err);
    }
  };

  const _handleSection = key => {
    const found = activeSections.find(item => item === key);
    if (found) {
      setActiveSections(activeSections.filter(item => item !== key));
    } else {
      setActiveSections([...activeSections, key]);
    }
  };

  const _handleChanges = () => {
    const {domainUriPrefix, link, afl, apn, ibi, ius, isi, ifl, efr} =
      dynamicLinkProps;
    setDynamicLink(
      `${domainUriPrefix}/?link=${link}&apn=${apn}&afl=${afl}&isi=${isi}&ibi=${ibi}&ifl=${ifl}&ius=${ius}&efr=${efr}`,
    );
  };

  const _handleCloseQRModal = () => {
    // setShowQRModal(false);
    setQRCodeValue(null);
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

  useEffect(() => {
    if (dynamicLinkProps?.domainUriPrefix && dynamicLinkProps?.link) {
      _buildShortDynamicLinks();
    }
  }, [dynamicLink]);

  useEffect(() => {
    _handleChanges();
  }, [dynamicLinkProps]);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const renderFieldsBySection = (item, index) => {
    const itemKey = item.key;
    const value = dynamicLinkProps[itemKey];
    const isAnimated = animatedKey === itemKey;

    return (
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <Line vertical color="#A9A9A9" />
        <View style={{flex: 1, marginLeft: 10}}>
          {itemKey === 'efr' ? (
            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => {
                const efrValue = value === 1 ? 0 : 1;
                setDynamicLinkProps({
                  ...dynamicLinkProps,
                  [itemKey]: efrValue,
                });
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disable={false}
                  value={value === 1 ? true : false}
                  onValueChange={val => {
                    const efrValue = val ? 1 : 0;
                    setDynamicLinkProps({
                      ...dynamicLinkProps,
                      [itemKey]: efrValue,
                    });
                  }}
                />
                <Text style={{marginBottom: 1}}>
                  Skip the app preview page (not recommended)
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <CustomInput
              key={item.key}
              label={item.label}
              multiline
              keyboardType={item?.keyboardType}
              placeholder="Code"
              value={value?.toString()}
              onChangeText={val => {
                setDynamicLinkProps({
                  ...dynamicLinkProps,
                  [itemKey]: val,
                });
              }}
              button
              icon="reset"
              animation={isAnimated}
              onButtonPress={() => {
                setDynamicLinkProps({
                  ...dynamicLinkProps,
                  [item.key]: item.value.toString(),
                });
                setTimeout(() => {
                  setAnimatedKey(itemKey);
                });
              }}
            />
          )}
        </View>
      </View>
    );
  };

  const renderSection = (item, index) => {
    const itemKey = item.key;
    const showFields = activeSections.find(sec => sec === itemKey);

    return (
      <>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            _handleSection(item.key);
          }}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={[styles.subtitle, {color: '#FFF'}]}>
              {`${index + 1} - ${item.value}`}
            </Text>
            <Image
              source={chevronIcon}
              style={[
                {width: 24, height: 24},
                showFields && {transform: [{rotate: '180deg'}]},
              ]}
            />
          </View>
        </TouchableOpacity>
        {showFields && <View>{item?.fields?.map(renderFieldsBySection)}</View>}
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      <ReactNativeModal
        isVisible={qrCodeValue}
        style={{margin: 0}}
        onBackButtonPress={_handleCloseQRModal}
        onBackdropPress={_handleCloseQRModal}>
        <View style={{width: '100%', alignItems: 'center'}}>
          {qrCodeValue && <QRCode value={qrCodeValue} size={300} />}
        </View>
      </ReactNativeModal>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <View style={{marginBottom: 30}}>
            <TouchableOpacity
              style={{marginBottom: 10, marginHorizontal: -10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={backIcon} style={{width: 32, height: 32}} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.title}>Firebase Dynamic Link</Text>
              <Text style={[styles.subtitle, {fontWeight: '300'}]}>
                Manual URL Construction
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={[styles.subtitle, {fontSize: 20, marginRight: 10}]}>
              Preview
            </Text>
            <View style={{flex: 1}}>
              <Line />
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <CustomTextArea
              label="Short Dynamic Link"
              hint={copyText}
              value={shortDynamicLink ?? '-'}
              onPress={() => {
                _handleCopy(shortDynamicLink);
              }}
              error={ShortDynamicLinkError}
            />
            {shortDynamicLink && (
              <TouchableOpacity
                onPress={() => {
                  setQRCodeValue(shortDynamicLink);
                }}>
                <QRCode value={shortDynamicLink} size={100} />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <CustomTextArea
              label="Long Dynamic Link"
              hint={copyText}
              value={dynamicLink ?? '-'}
              onPress={() => {
                _handleCopy(dynamicLink);
              }}
            />
            {dynamicLink && (
              <TouchableOpacity
                onPress={() => {
                  setQRCodeValue(dynamicLink);
                }}>
                <QRCode value={dynamicLink} size={100} />
              </TouchableOpacity>
            )}
          </View>
          <Line />
          <View style={{flex: 1}}>{sections.map(renderSection)}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FirebaseDynamicLink;
