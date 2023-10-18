import {
  Canvas,
  Circle,
  Group,
  Skia,
  Text,
  useFont,
} from '@shopify/react-native-skia';
import { area, scaleLinear } from 'd3';
import { useEffect } from 'react';
import { View } from 'react-native';

import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export type GaugeConfig = {
  minValue: number;
  maxValue: number;
  circleThickness: number;
  circleFillGap: number;
  circleColor: string;
  waveHeight: number;
  waveCount: number;
  waveRiseTime: number;
  waveAnimateTime: number;
  waveRise: boolean;
  waveHeightScaling: boolean;
  waveAnimate: boolean;
  waveColor: string;
  waveOffset: number;
  textVertPosition: number;
  textSize: number;
  valueCountUp: boolean;
  textSuffix: string;
  textColor: string;
  waveTextColor: string;
  toFixed: number;
};

function liquidFillGaugeDefaultSettings(): GaugeConfig {
  return {
    minValue: 0, // The gauge minimum value.
    maxValue: 100, // The gauge maximum value.
    circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
    circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    circleColor: '#178BCA', // The color of the outer circle.
    waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
    waveCount: 1, // The number of full waves per width of the wave circle.
    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
    waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
    waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
    waveAnimate: true, // Controls if the wave scrolls or is static.
    waveColor: '#178BCA', // The color of the fill wave.
    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
    valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
    textSuffix: '%', // If true, a % symbol is displayed after the value.
    textColor: '#045681', // The color of the value text when the wave does not overlap it.
    waveTextColor: '#A4DBf8', // The color of the value text when the wave overlaps it.
    toFixed: 0,
  };
}

type Props = {
  config?: Partial<GaugeConfig>;
  width?: number;
  height?: number;
  value?: number;
};

export const LiquidGauge = ({
  config,
  width = 150,
  height = 150,
  value = 50,
}: Props) => {
  const defaultConfig = liquidFillGaugeDefaultSettings();
  const mergedConfig = { ...defaultConfig, ...config };

  const fillPercent =
    Math.max(mergedConfig.minValue, Math.min(mergedConfig.maxValue, value)) /
    mergedConfig.maxValue;
  let waveHeightScale;
  if (mergedConfig.waveHeightScaling) {
    waveHeightScale = scaleLinear()
      .range([0, mergedConfig.waveHeight, 0])
      .domain([0, 50, 100]);
  } else {
    waveHeightScale = scaleLinear()
      .range([mergedConfig.waveHeight, mergedConfig.waveHeight])
      .domain([0, 100]);
  }

  const radius = Math.min(width, height) / 2;
  const circleThickness = mergedConfig.circleThickness * radius;

  const waveClipCount = 1 + mergedConfig.waveCount;
  const circleFillGap = mergedConfig.circleFillGap * radius;
  const fillCircleMargin = circleThickness + circleFillGap;
  const fillCircleRadius = radius - fillCircleMargin;
  const waveLength = (fillCircleRadius * 2) / mergedConfig.waveCount;
  const waveClipWidth = waveLength * waveClipCount;
  const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

  const textPixels = (mergedConfig.textSize * radius) / 2;
  const textFinalValue = Number(value.toFixed(mergedConfig.toFixed));
  const textStartValue = mergedConfig.valueCountUp
    ? mergedConfig.minValue
    : textFinalValue;
  // Scale for controlling the position of the text within the gauge.
  const textRiseScaleY = scaleLinear()
    .range([
      fillCircleMargin + fillCircleRadius * 2,
      fillCircleMargin + textPixels * 0.7,
    ])
    .domain([0, 1]);

  // Data for building the clip wave area.
  const data: Array<[number, number]> = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    data.push([i / (40 * waveClipCount), i / 40]);
  }

  const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
  const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);

  const clipArea = area()
    .x(function (d) {
      return waveScaleX(d[0]);
    })
    .y0(function (d) {
      return waveScaleY(
        Math.sin(
          Math.PI * 2 * mergedConfig.waveOffset * -1 +
            Math.PI * 2 * (1 - mergedConfig.waveCount) +
            d[1] * 2 * Math.PI
        )
      );
    })
    .y1(function (_d) {
      return fillCircleRadius * 2 + waveHeight * 5;
    });

  const waveGroupXPosition =
    fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;

  const font = useFont(require('../assets/fonts/Roboto-Bold.ttf'), textPixels);

  const textValue = useSharedValue(textStartValue);
  const translateYPercent = useSharedValue(0);
  const translateXProgress = useSharedValue(0);

  useEffect(() => {
    translateYPercent.value = withTiming(fillPercent, {
      duration: mergedConfig.waveRiseTime,
    });
  }, [fillPercent]);

  useEffect(() => {
    textValue.value = withTiming(textFinalValue, {
      duration: mergedConfig.valueCountUp ? mergedConfig.waveRiseTime : 0,
    });
  }, [textFinalValue]);

  useEffect(() => {
    if (mergedConfig.waveAnimate) {
      translateXProgress.value = withRepeat(
        withTiming(1, {
          duration: mergedConfig.waveAnimateTime,
          easing: Easing.linear,
        }),
        -1
      );
    }
  }, [mergedConfig.waveAnimate]);

  const text = useDerivedValue(() => {
    return `${textValue.value.toFixed(mergedConfig.toFixed)}${
      mergedConfig.textSuffix
    }`;
  }, [textValue]);

  const textTranslateX = useDerivedValue(() => {
    const textWidth = font?.getTextWidth(text.value) ?? 0;
    return radius - textWidth * 0.5;
  }, [text, radius, font]);

  const clipSVGString = clipArea(data)!;
  const path = useDerivedValue(() => {
    const p = Skia.Path.MakeFromSVGString(clipSVGString)!;
    const m = Skia.Matrix();
    m.translate(
      waveGroupXPosition + waveLength * translateXProgress.value,
      fillCircleMargin + (1 - translateYPercent.value) * fillCircleRadius * 2
    );
    p.transform(m);
    return p;
  }, [translateXProgress, translateYPercent, clipSVGString]);

  const textTransform = [
    // { translateX: textTranslateX.value },
    // { translateY: radius - textPixels * 0.75 },
    { translateY: textRiseScaleY(mergedConfig.textVertPosition) - textPixels },
  ];

  return (
    <View>
      <Canvas style={{ width, height }}>
        <Group>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - circleThickness * 0.5}
            // opacity={0.5}
            color={mergedConfig.circleColor}
            // color="black"
            style="stroke"
            strokeWidth={circleThickness}
          />
          {/* <Path path={path} color={mergedConfig.circleColor} opacity={0.5} /> */}

          <Text
            x={textTranslateX}
            y={textPixels}
            text={text}
            font={font}
            color={mergedConfig.textColor}
            transform={textTransform}
          />

          <Group clip={path}>
            <Circle
              cx={radius}
              cy={radius}
              r={fillCircleRadius}
              color={mergedConfig.waveColor}
            />

            <Text
              x={textTranslateX}
              y={textPixels}
              text={text}
              font={font}
              color={mergedConfig.waveTextColor}
              transform={textTransform}
            />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
};
