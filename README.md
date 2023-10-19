# react-native-liquid-gauge

Unveiling the React Native Liquid Gauge, a charming and highly customizable UI component engineered to represent progress in a visually intuitive manner. This library is built on top of react-native-skia, ensuring smooth rendering and high performance across different platforms while making it easier to integrate within your React Native projects.

![demo](https://raw.githubusercontent.com/dimaportenko/react-native-liquid-gauge/main/docs/demo.gif)

## Installation

This library has peer dependencies on [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/), [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation), [d3](https://www.npmjs.com/package/d3) and for typescript [@types/d3](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/d3)

```sh
npm install react-native-liquid-gauge @shopify/react-native-skia react-native-reanimated d3
npm install --save-dev @types/d3
```

Follow additional steps on the libraries documentaiton page [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/), [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation).

## Usage

Take a look example directory

```js

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

# TODO

- [ ] publish to npm
- [ ] test install as npm package
- [ ] add github action to publish to npm
- [ ] add readme
