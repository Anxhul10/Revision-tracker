import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DifficultyPieChartProps {
  data: { difficulty: string; count: number; fill: string }[];
}

export function DifficultyPieChart({ data }: DifficultyPieChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-500">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="difficulty"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((entry) => (
            <Cell key={entry.difficulty} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '12px', color: '#8b949e' }}
          formatter={(value) => <span style={{ color: '#c9d1d9' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
