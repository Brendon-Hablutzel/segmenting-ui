import { JobStatusType, MetricsJobsType } from '@/utils/backend';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType } from 'tailwindcss/types/config';

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 0) {
    const typedLabel = label as Date;

    const total = payload
      .map((series) => (series.value ? parseInt(series.value) : 0))
      .reduce((acc, curr) => acc + curr, 0);

    return (
      <div className="bg-bg-dark rounded-md p-2 bg-opacity-75 text-text-light">
        <h2 className="font-semibold">
          {`${typedLabel.toISOString().replace('T', ' ').split('.')[0].split(' ')[0]}`}
        </h2>
        {payload.toReversed().map((series, idx) => {
          const name = series.name?.toString() ?? '';

          const color =
            name === 'running'
              ? 'text-yellow-400'
              : name === 'finished'
                ? 'text-green-600'
                : name === 'error'
                  ? 'text-red-600'
                  : 'text-gray-400';

          return (
            <div className={`${color}`} key={idx}>
              <span className="font-light">{name}:</span>{' '}
              <span className="font-medium">{series.value}</span>
            </div>
          );
        })}
        <div className="text-text-light">total: {total}</div>
      </div>
    );
  }

  return null;
};

const metricsJobsToDailyTimeseries = (
  jobs: MetricsJobsType,
): {
  timestamp: Date;
  waiting: number;
  running: number;
  finished: number;
  error: number;
}[] => {
  const timestamps: Record<number, Record<JobStatusType, number>> = {};
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    timestamps[day.getTime()] = {
      waiting: 0,
      running: 0,
      finished: 0,
      error: 0,
    };
  }

  for (const job of jobs) {
    const timestamp = job.submittedAt;
    if (!timestamp) {
      continue;
    }

    const startOfDay = new Date(
      timestamp.getFullYear(),
      timestamp.getMonth(),
      timestamp.getDate(),
    ).valueOf();
    if (!(startOfDay in timestamps)) {
      continue;
    }

    timestamps[startOfDay][job.status] += 1;
  }

  return Object.entries(timestamps)
    .toSorted((a, b) => Number(a[0]) - Number(b[0]))
    .map((entry) => ({
      timestamp: new Date(Number(entry[0])),
      ...entry[1],
    }));
};

const JobsOverTimeChart = ({ jobs }: { jobs: MetricsJobsType }) => {
  const data = metricsJobsToDailyTimeseries(jobs);

  return (
    <ResponsiveContainer width="100%" height="100%" className="select-none">
      <BarChart data={data} margin={{ left: -15 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(v: Date) =>
            `${v.toISOString().replace('T', ' ').split('.')[0].split(' ')[0].substring(5)}`
          }
        />
        <YAxis />
        <Tooltip
          animationDuration={300}
          content={<CustomTooltip />}
          cursor={{ fill: '#050E05', opacity: 0.8 }}
        />
        <Legend />
        <Bar
          fillOpacity={0.7}
          dataKey="waiting"
          stackId="a"
          fill="oklch(0.707 0.022 261.325)"
        />
        <Bar
          fillOpacity={0.7}
          dataKey="running"
          stackId="a"
          fill="oklch(0.852 0.199 91.936)"
        />
        <Bar
          fillOpacity={0.7}
          dataKey="error"
          stackId="a"
          fill="oklch(0.577 0.245 27.325)"
        />
        <Bar
          fillOpacity={0.7}
          dataKey="finished"
          stackId="a"
          fill="oklch(0.627 0.194 149.214)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default JobsOverTimeChart;
