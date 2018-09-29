import '@storybook/addon-options/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import 'storybook-addon-styled-component-theme/dist/register';

import '@storybook/addon-actions/register';
import registerScissors from 'storybook-addon-scissors';
import devicesJSON from './devices.json';
 
// registerScissors() takes an array of device objects with the following signature:
// [{
//   uid: String (must be unique)
//   title: String
//   width: Number
//   height: Number
// }]
// In the case of using the device list from ChromeDevTools,
// we can map them the following way.
const devices = devicesJSON.extensions.map(({ device }) => ({
  uid: device.title,
  title: device.title,
  width: device.screen.vertical.width,
  height: device.screen.vertical.height,
}));
 
registerScissors(devices);