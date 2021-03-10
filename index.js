import { getStorybookUI, configure } from '@storybook/react-native';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import App from './App';

configure(() => {
  require('./storybook/stories/index.js'); // we will create this file in the next steps
}, module);

const StorybookUIRoot = getStorybookUI({});

// AppRegistry.registerComponent(appName, () => StorybookUIRoot);
AppRegistry.registerComponent(appName, () => App);