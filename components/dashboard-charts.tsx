"use client"

import { useTheme } from "next-themes"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const lineData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 27 },
  { name: "May", value: 29 },
  { name: "Jun", value: 35 },
  { name: "Jul", value: 40 },
]

const barData = [
  { name: "Chat", value: 45 },
  { name: "Code", value: 30 },
  { name: "Workflows", value: 15 },
  { name: "Docs", value: 10 },
]

const pieData = [
  { name: "Chat", value: 45 },
  { name: "Code", value: 30 },
  { name: "Workflows", value: 15 },
  { name: "Docs", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

export function LineChart() {
  const { theme } = useTheme()
  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            color: textColor,
            borderColor: gridColor,
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart() {
  const { theme } = useTheme()
  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            color: textColor,
            borderColor: gridColor,
          }}
        />
        <Bar dataKey="value" fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function PieChart() {
  const { theme } = useTheme()
  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend formatter={(value) => <span style={{ color: textColor }}>{value}</span>} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            color: textColor,
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

