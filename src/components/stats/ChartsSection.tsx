import type { Question } from '../../types';
import { getDifficultyDistribution, getTopicDistribution } from '../../utils/stats';
import { DifficultyPieChart } from './DifficultyPieChart';
import { TopicBarChart } from './TopicBarChart';

interface ChartsSectionProps {
  questions: Question[];
}

export function ChartsSection({ questions }: ChartsSectionProps) {
  const topicData = getTopicDistribution(questions);
  const difficultyData = getDifficultyDistribution(questions);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-300">Topic Distribution</h3>
        <TopicBarChart data={topicData} />
      </div>
      <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-300">Difficulty Split</h3>
        <DifficultyPieChart data={difficultyData} />
      </div>
    </div>
  );
}
