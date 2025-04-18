"use client"

import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { LineChart as ReLineChart, Line } from "recharts"

// Colors for charts
const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0", "#795548"]

interface PieChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

export function PieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps {
  data: Array<{
    name: string
    disputes: number
  }>
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="disputes" fill="#4CAF50" />
      </ReBarChart>
    </ResponsiveContainer>
  )
}

interface LineChartProps {
  data: Array<{
    month: string
    price: number
  }>
}

export function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#4CAF50" activeDot={{ r: 8 }} />
      </ReLineChart>
    </ResponsiveContainer>
  )
}
