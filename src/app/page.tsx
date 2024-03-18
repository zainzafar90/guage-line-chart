"use client";
import React, { Fragment } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import { PieChart, Pie, Cell } from "recharts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gray-800 text-white p-10">
        {/* Gauge */}
        <div className="relative pt-3 h-48 w-full">
          <Chart
            data={[
              { name: "A", value: 10 },
              { name: "B", value: 5 },
              { name: "C", value: 10 },
              { name: "D", value: 15 },
              { name: "E", value: 20 },
            ]}
          />
        </div>

        {/* Status Text */}
        <p className="text-center text-lg mb-5">
          Meeting is going well! Dive...
        </p>

        {/* Timeline */}
        <div className="relative pt-3 h-24 w-full">
          <LineChartsDemo />
        </div>
      </div>
    </main>
  );
}

const TOTAL_MINUTES = 90;
const DEGREES_PER_MINUTE = 360 / TOTAL_MINUTES;

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describePieSlice(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "L",
    x,
    y,
  ].join(" ");
  return d;
}

export const Chart = (props: {
  data: { name: string; value: number }[];
  width?: number;
  height?: number;
}) => {
  const { width = 56, height = 56 } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.2"
        cx={24}
        cy={24}
        r={24}
        transform="matrix(-1 0 0 1 52 4)"
        fill="#08B461"
      />
      <circle cx={28} cy={28} r={27} stroke="#08B461" strokeWidth={2} />

      {props.data.map((item, index) => {
        const startAngle = props.data
          .slice(0, index)
          .reduce((acc, curr) => acc + curr.value * DEGREES_PER_MINUTE, 0);
        const endAngle = startAngle + item.value * DEGREES_PER_MINUTE;

        return (
          <Fragment key={item.name}>
            <path
              id={`arc-${item.name}`}
              d={describePieSlice(28, 28, 24, startAngle, endAngle)}
              fill="#08B461"
            />

            {/* Divider is custom drawn line and won't get calculated based on angles, so is only applicable at 90 degrees */}
            {item.name === "CV" && (
              <path d="M28 28H52" stroke="#CCEFDF" strokeWidth={2}></path>
            )}
          </Fragment>
        );
      })}
    </svg>
  );
};

const data = [
  {
    name: "Page A",
    pv: 3400,
  },
  {
    name: "Page B",
    pv: 2398,
  },
  {
    name: "Page C",
    pv: 4800,
  },
  {
    name: "Page D",
    pv: 2908,
  },
  {
    name: "Page E",
    pv: 4800,
  },
  {
    name: "Page F",
    pv: 3800,
  },
  {
    name: "Page G",
    pv: 4300,
  },
];

export const LineChartsDemo = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#999" strokeWidth={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const RADIAN = Math.PI / 180;
const guageData = [
  { name: "A", value: 20, color: "#e63946" },
  { name: "B", value: 15, color: "#ffb703" },
  { name: "C", value: 30, color: "#ffd60a" },
  { name: "D", value: 15, color: "#06d6a0" },
  { name: "E", value: 20, color: "#2ec4b6" },
];
const cx = 150;
const cy = 200;
const iR = 65;
const oR = 130;
const value = 50;

const needle = (
  value: number,
  data: any[],
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string | undefined
) => {
  let total = 0;
  guageData.forEach((v: { value: number }) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />
    </>
  );
};

const GuageChartDemo = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <GaugeChart max={180} value={50} />
      </ResponsiveContainer>
      {/* {needle(value, guageData, cx, cy, iR, oR, "#000")} */}
    </>
  );
};

const GaugeChart = ({ value, max }: { value: number; max: number }) => {
  const r = 100; // radius of the gauge
  const strokeWidth = 10; // width of the gauge stroke
  const circumference = r * Math.PI; // half the circumference of the gauge
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / max) * circumference;

  // Function to calculate the position of the needle
  const getNeedlePosition = (value: number, max: number) => {
    const theta = (1 - value / max) * Math.PI; // Angle in radians
    const x = r + r * Math.cos(theta);
    const y = r - r * Math.sin(theta);
    return { x, y };
  };

  const { x, y } = getNeedlePosition(value, max);

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={400}
      height={400}
      viewBox="0 0 400 400"
      aria-hidden="false"
      aria-label="Interactive chart"
    >
      <defs aria-hidden="true">
        <clipPath id="highcharts-eq7oi31-2-">
          <rect x={0} y={0} width={380} height={339} fill="none" />
        </clipPath>
        <clipPath id="highcharts-eq7oi31-3-">
          <rect
            x={0}
            y={0}
            width={380}
            height="452.62496156594943"
            fill="none"
          />
        </clipPath>
      </defs>
      <g className="highcharts-pane-group" data-z-index={0} aria-hidden="true">
        <path
          fill="#f2f2f2"
          d="M 63.128750000000025 215.49999999999997 A 136.87124999999997 136.87124999999997 0 0 1 336.87118156438066 215.36312877281193 L 286.4449567775036 215.41355501440754 A 86.445 86.445 0 0 0 113.555 215.5 Z"
          className="highcharts-pane "
        />
      </g>
      <g
        className="highcharts-plot-bands-0"
        data-z-index={0}
        aria-hidden="true"
      >
        <path
          fill="#4cd774"
          className="highcharts-plot-band "
          d="M 63.128750000000025 215.49999999999997 A 136.87124999999997 136.87124999999997 0 0 1 242.1653488710621 85.2854753449366 L 226.63074665540765 133.25924758627573 A 86.445 86.445 0 0 0 113.555 215.5 Z"
        />
      </g>
      <g
        className="highcharts-axis highcharts-yaxis highcharts-radial-axis"
        data-z-index={2}
        aria-hidden="true"
      >
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 59.92500000000001 215.49999999999997 L 56.92500000000001 215.49999999999997"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 86.67694451292925 133.1659807851318 L 84.24989352980442 131.4026250282544"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 156.71444451292925 82.28075847995638 L 155.7873935298044 79.42758893107091"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 243.28555548707078 82.28075847995638 L 244.21260647019562 79.42758893107091"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 313.32305548707075 133.16598078513184 L 315.7501064701956 131.40262502825442"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 340.075 215.50000000000006 L 343.075 215.50000000000006"
          opacity={1}
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 59.92500000000001 215.49999999999997 L 49.92500000000001 215.49999999999997"
          opacity={1}
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 340.075 215.50000000000006 L 350.075 215.50000000000006"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 61.02953321337455 197.94394730848003 L 58.053189109431116 197.56794760778712"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 64.325713704907 180.66476405538296 L 61.41996422152113 179.91869439388842"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 69.7615587392032 163.9349532826937 L 66.97222928153846 162.83057962463968"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 77.25134179285583 148.01835410020226 L 74.62242175272422 146.5730930778971"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 97.88971951394582 119.61206413703891 L 95.70281363168158 117.55842281925285"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 110.71283463595233 107.5703575181813 L 108.80056266670627 105.25881778985394"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 124.94406169331708 97.23076583530523 L 123.33658130838009 94.69778205879919"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 140.35896573402243 88.75635062582234 L 139.08162785932723 86.04186946842427"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 173.75256235940466 77.90611335417893 L 173.19041841564749 74.95925160199286"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 191.20461797693144 75.70140601540987 L 191.0162464183435 72.70732583012506"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 208.79538202306858 75.70140601540987 L 208.98375358165654 72.70732583012506"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 226.24743764059542 77.90611335417896 L 226.8095815843526 74.95925160199289"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 259.64103426597757 88.75635062582234 L 260.9183721406728 86.04186946842427"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 275.055938306683 97.23076583530528 L 276.66341869162 94.69778205879923"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 289.2871653640477 107.57035751818134 L 291.19943733329376 105.25881778985398"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 302.11028048605425 119.61206413703897 L 304.2971863683185 117.5584228192529"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 322.7486582071442 148.01835410020226 L 325.3775782472758 146.5730930778971"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 330.23844126079683 163.93495328269378 L 333.0277707184616 162.83057962463977"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 335.674286295093 180.664764055383 L 338.5800357784789 179.91869439388842"
          opacity={1}
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 338.9704667866255 197.94394730848012 L 341.94681089056894 197.5679476077872"
          opacity={1}
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 86.67694451292925 133.1659807851318 L 78.58677456917978 127.28812826220708"
          opacity={1}
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 156.71444451292925 82.28075847995638 L 153.6242745691798 72.77019331700484"
          opacity={1}
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 243.28555548707078 82.28075847995638 L 246.37572543082027 72.77019331700484"
          opacity={1}
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 313.32305548707075 133.16598078513184 L 321.41322543082026 127.2881282622071"
          opacity={1}
        />
        <path
          fill="none"
          className="highcharts-axis-line"
          data-z-index={7}
          d="M 59.92500000000001 215.49999999999997 A 140.075 140.075 0 0 1 340.07492996250585 215.35992502334582 M 200 215.5 A 0 0 0 0 0 200 215.5"
        />
      </g>
      <g
        className="highcharts-data-labels highcharts-series-0 highcharts-gauge-series highcharts-color-0 highcharts-tracker"
        data-z-index={2}
        opacity={1}
        transform="translate(10,46) scale(1 1)"
        aria-hidden="true"
      >
        <g
          className="highcharts-label highcharts-data-label highcharts-data-label-color-0"
          data-z-index={1}
          transform="translate(174,185)"
        >
          <rect
            fill="none"
            className="highcharts-label-box highcharts-data-label-box"
            x={0}
            y={0}
            width={32}
            height={23}
            rx={3}
            ry={3}
          />
          <text
            x={5}
            data-z-index={1}
            y={16}
            style={{
              color: "rgb(0, 0, 0)",
              fontSize: 11,
              fontWeight: "bold",
              fill: "rgb(0, 0, 0)",
            }}
          >
            <tspan
              className="highcharts-text-outline"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="2px"
              strokeLinejoin="round"
              style={{}}
            >
              60%
              <tspan x={5} dy={0}>
                ​
              </tspan>
            </tspan>
            60%
          </text>
        </g>
      </g>
      <g
        className="highcharts-series-group"
        data-z-index={3}
        aria-hidden="false"
      >
        <g
          className="highcharts-series highcharts-series-0 highcharts-gauge-series highcharts-color-0 highcharts-tracker"
          data-z-index="0.1"
          opacity={1}
          transform="translate(10,46) scale(1 1)"
          clipPath="url(#highcharts-eq7oi31-3-)"
          aria-hidden="false"
        >
          <path
            fill="#666666"
            d="M 0 -4 L 1.1526 -4 L 115.26 -1.5 L 115.26 1.5 L 1.1526 4 L 0 4 Z"
            transform="translate(190,169.5) rotate(-71.99999999999999 0 0)"
            data-z-index={1}
            className="highcharts-dial"
            tabIndex={-1}
            role="img"
            aria-label="60 %. Value."
            style={{ outline: "none" }}
          />
          <circle
            cx={0}
            cy={0}
            r={10}
            data-z-index={2}
            className="highcharts-pivot"
            transform="translate(190,169.5)"
            fill="#fff"
            stroke="#666666"
            strokeWidth={3}
          />
        </g>
        <g
          className="highcharts-markers highcharts-series-0 highcharts-gauge-series highcharts-color-0"
          data-z-index="0.1"
          opacity={1}
          transform="translate(10,46) scale(1 1)"
          clipPath="none"
          aria-hidden="true"
        />
      </g>
    </svg>
  );
};
