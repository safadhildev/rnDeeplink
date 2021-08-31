import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import Navigator from './src/routes/navigator';

const App = () => {
  return (
    <>
      <RootSiblingParent>
        <Navigator />
      </RootSiblingParent>
    </>
  );
};

export default App;
