# react-native-liquid-gauge

<div align="left">
  <a align="center" href="https://github.com/dimaportenko?tab=followers">
    <img src="https://img.shields.io/github/followers/dimaportenko?label=Follow%20%40dimaportenko&style=social" />
  </a>
  <br/>
  <a align="center" href="https://twitter.com/dimaportenko">
    <img src="https://img.shields.io/twitter/follow/dimaportenko?label=Follow%20%40dimaportenko&style=social" />
  </a>
  <br/>
  <a align="center" href="https://www.youtube.com/channel/UCReKeeIMZywvQoaZPZKzQbQ">
    <img src="https://img.shields.io/youtube/channel/subscribers/UCReKeeIMZywvQoaZPZKzQbQ" />
  </a>
  <br/>
  <a align="center" href="https://www.youtube.com/channel/UCReKeeIMZywvQoaZPZKzQbQ">
    <img src="https://img.shields.io/youtube/channel/views/UCReKeeIMZywvQoaZPZKzQbQ" />
  </a>
  <br/>
  <a align="center" href="https://www.twitch.tv/lost_semicolon">
    <img src="https://img.shields.io/twitch/status/lost_semicolon?style=social" />
  </a>
</div>
<br/>


Unveiling the React Native Liquid Gauge, a charming and highly customizable UI component engineered to represent progress in a visually intuitive manner. This library is built on top of react-native-skia, ensuring smooth rendering and high performance across different platforms while making it easier to integrate within your React Native projects.

![demo](https://raw.githubusercontent.com/dimaportenko/react-native-liquid-gauge/main/docs/demo.gif)

## Installation

This library has peer dependencies on [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/), [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation), [d3](https://www.npmjs.com/package/d3) and for typescript [@types/d3](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/d3)

### Expo
```sh
npx expo install react-native-liquid-gauge @shopify/react-native-skia react-native-reanimated d3
npx expo install --save-dev @types/d3
```


### React Native CLI
```sh
npm install react-native-liquid-gauge @shopify/react-native-skia react-native-reanimated d3
npm install --save-dev @types/d3
```



Follow additional steps on the libraries documentaiton page [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/), [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation).

## Usage

Take a look example directory

```js
  import { LiquidGauge } from 'react-native-liquid-gauge';

  // with default config
  <LiquidGauge value={60} />

  // or with custom config
  <LiquidGauge
    config={{
      circleColor: '#FF7777',
      textColor: '#FF4444',
      waveTextColor: '#FFAAAA',
      waveColor: '#FFDDDD',
      circleThickness: 0.2,
      textVertPosition: 0.2,
      waveAnimateTime: 1000,
    }}
    value={30}
    width={200}
    height={200}
  />
```

## Props

The `LiquidGauge` component accepts the following props:

### `config` (optional)
A configuration object that can override the default settings of the gauge. It is a partial type of `GaugeConfig` and can include any of the following properties:

```typescript
{
  minValue: number;           // Default: 0 - The gauge minimum value.
  maxValue: number;           // Default: 100 - The gauge maximum value.
  circleThickness: number;    // Default: 0.05 - The outer circle thickness as a percentage of its radius.
  circleFillGap: number;      // Default: 0.05 - The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
  circleColor: string;        // Default: '#178BCA' - The color of the outer circle.
  waveHeight: number;         // Default: 0.05 - The wave height as a percentage of the radius of the wave circle.
  waveCount: number;          // Default: 1 - The number of full waves per width of the wave circle.
  waveRiseTime: number;       // Default: 1000 - The amount of time in milliseconds for the wave to rise from 0 to its final height.
  waveAnimateTime: number;    // Default: 18000 - The amount of time in milliseconds for a full wave to enter the wave circle.
  waveRise: boolean;          // Default: true - Control if the wave should rise from 0 to its full height, or start at its full height.
  waveHeightScaling: boolean; // Default: true - Controls wave size scaling at low and high fill percentages.
  waveAnimate: boolean;       // Default: true - Controls if the wave scrolls or is static.
  waveColor: string;          // Default: '#178BCA' - The color of the fill wave.
  waveOffset: number;         // Default: 0 - The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
  textVertPosition: number;   // Default: 0.5 - The height at which to display the percentage text within the wave circle. 0 = bottom, 1 = top.
  textSize: number;           // Default: 1 - The relative height of the text to display in the wave circle. 1 = 50%
  valueCountUp: boolean;      // Default: true - If true, the displayed value counts up from 0 to its final value upon loading. If false, the final value is displayed.
  textSuffix: string;         // Default: '%' - The text suffix to display after the value.
  textColor: string;          // Default: '#045681' - The color of the value text when the wave does not overlap it.
  waveTextColor: string;      // Default: '#A4DBf8' - The color of the value text when the wave overlaps it.
  toFixed: number;            // Default: 0 - Round value to this many decimal places.
}
```

### `width` (optional)
The width of the gauge component. Default is 150.

### `height` (optional)
The height of the gauge component. Default is 150.

### `value` (optional)
The current value of the gauge. Default is 50.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

# TODO

- [x] publish to npm
- [x] test install as npm package
- [x] add github action to publish to npm
- [x] add readme
- [ ] add to [directory](https://reactnative.directory/)
