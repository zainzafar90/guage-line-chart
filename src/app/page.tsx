"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gray-800 text-white flex flex-col space-y-3 p-10">
        <div className="relative min-h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <GaugeChart max={100} value={50} />
          </ResponsiveContainer>
        </div>

        <div className="relative flex flex-col space-y-2 max-w-xs mx-auto -top-12">
          <p className="text-center text-lg">Meeting is going well! Dive...</p>

          <p className="text-center text-sm opacity-60">
            Keep up the way you are conducting the conversation with mahnoor
            bhatti
          </p>
        </div>

        {/* Timeline */}
        <div className="relative h-24 w-full">
          <p className="text-center font-medium text-sm uppercase mb-5 opacity-90">
            Meeting Timeline
          </p>
          <LineChartsDemo />
        </div>
      </div>
    </main>
  );
}

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

const GaugeChart = ({ value, max }: { value: number; max: number }) => {
  const gaugeCenterX = 200;
  const gaugeCenterY = 215.5;

  const fraction = value / max;

  const angle = fraction * 180 - 180;

  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <g>
        <path
          fill="#f2f2f2"
          d="M 63.128750000000025 215.49999999999997 A 136.87124999999997 136.87124999999997 0 0 1 336.87118156438066 215.36312877281193 L 286.4449567775036 215.41355501440754 A 86.445 86.445 0 0 0 113.555 215.5 Z"
        />
      </g>
      <g>
        <path
          fill="#4cd774"
          d="M 63.128750000000025 215.49999999999997 A 136.87124999999997 136.87124999999997 0 0 1 242.1653488710621 85.2854753449366 L 226.63074665540765 133.25924758627573 A 86.445 86.445 0 0 0 113.555 215.5 Z"
        />
      </g>
      <g>
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 59.92500000000001 215.49999999999997 L 56.92500000000001 215.49999999999997"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 86.67694451292925 133.1659807851318 L 84.24989352980442 131.4026250282544"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 156.71444451292925 82.28075847995638 L 155.7873935298044 79.42758893107091"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 243.28555548707078 82.28075847995638 L 244.21260647019562 79.42758893107091"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 313.32305548707075 133.16598078513184 L 315.7501064701956 131.40262502825442"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 340.075 215.50000000000006 L 343.075 215.50000000000006"
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 59.92500000000001 215.49999999999997 L 49.92500000000001 215.49999999999997"
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 340.075 215.50000000000006 L 350.075 215.50000000000006"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 61.02953321337455 197.94394730848003 L 58.053189109431116 197.56794760778712"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 64.325713704907 180.66476405538296 L 61.41996422152113 179.91869439388842"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 69.7615587392032 163.9349532826937 L 66.97222928153846 162.83057962463968"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 77.25134179285583 148.01835410020226 L 74.62242175272422 146.5730930778971"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 97.88971951394582 119.61206413703891 L 95.70281363168158 117.55842281925285"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 110.71283463595233 107.5703575181813 L 108.80056266670627 105.25881778985394"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 124.94406169331708 97.23076583530523 L 123.33658130838009 94.69778205879919"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 140.35896573402243 88.75635062582234 L 139.08162785932723 86.04186946842427"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 173.75256235940466 77.90611335417893 L 173.19041841564749 74.95925160199286"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 191.20461797693144 75.70140601540987 L 191.0162464183435 72.70732583012506"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 208.79538202306858 75.70140601540987 L 208.98375358165654 72.70732583012506"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 226.24743764059542 77.90611335417896 L 226.8095815843526 74.95925160199289"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 259.64103426597757 88.75635062582234 L 260.9183721406728 86.04186946842427"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 275.055938306683 97.23076583530528 L 276.66341869162 94.69778205879923"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 289.2871653640477 107.57035751818134 L 291.19943733329376 105.25881778985398"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 302.11028048605425 119.61206413703897 L 304.2971863683185 117.5584228192529"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 322.7486582071442 148.01835410020226 L 325.3775782472758 146.5730930778971"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 330.23844126079683 163.93495328269378 L 333.0277707184616 162.83057962463977"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 335.674286295093 180.664764055383 L 338.5800357784789 179.91869439388842"
        />
        <path
          fill="none"
          className="minor-tick"
          stroke="#9e9e9e"
          strokeWidth={1}
          d="M 338.9704667866255 197.94394730848012 L 341.94681089056894 197.5679476077872"
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 86.67694451292925 133.1659807851318 L 78.58677456917978 127.28812826220708"
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 156.71444451292925 82.28075847995638 L 153.6242745691798 72.77019331700484"
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 243.28555548707078 82.28075847995638 L 246.37572543082027 72.77019331700484"
        />
        <path
          fill="none"
          className="tick"
          stroke="#9e9e9e"
          strokeWidth={2}
          d="M 313.32305548707075 133.16598078513184 L 321.41322543082026 127.2881282622071"
        />
        <path
          fill="none"
          className="axis-line"
          d="M 59.92500000000001 215.49999999999997 A 140.075 140.075 0 0 1 340.07492996250585 215.35992502334582 M 200 215.5 A 0 0 0 0 0 200 215.5"
        />
      </g>

      <g
        transform={`translate(${gaugeCenterX},${gaugeCenterY}) rotate(${angle})`}
      >
        <path
          fill="#666666"
          d="M 0 -4 L 1.1526 -4 L 115.26 -1.5 L 115.26 1.5 L 1.1526 4 L 0 4 Z"
          transform="translate(0,0) rotate(0)"
        />
        <circle
          cx={0}
          cy={0}
          r={10}
          fill="#222"
          stroke="#666666"
          strokeWidth={3}
          transform="translate(0,0)"
        />
      </g>
    </svg>
  );
};
