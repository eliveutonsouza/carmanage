"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  preventiva: number;
  corretiva: number;
};

const COLORS = ["#22c55e", "#ef4444"];

export function ChartMaintenanceTypes({ preventiva, corretiva }: Props) {
  const data = [
    { name: "Preventiva", value: preventiva },
    { name: "Corretiva", value: corretiva },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} manutenções`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
