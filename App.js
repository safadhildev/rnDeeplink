import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import Navigator from './src/routes/navigator';

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

const App = () => {
  const {url: initialUrl} = useInitialURL();
  const [deeplink, setDeeplink] = useState(initialUrl);

  const _handleDeepLink = link => {
    setDeeplink(link?.url);
  };

  useEffect(() => {
    if (initialUrl) {
      _handleDeepLink({url: initialUrl});
    }
  }, [initialUrl]);

  useEffect(() => {
    Linking.addEventListener('url', _handleDeepLink);
    return () => Linking.removeEventListener('url', _handleDeepLink);
  }, []);

  return <Navigator deeplink={deeplink} />;
};

export default App;
