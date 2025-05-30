'use client';

import { useState } from 'react';
import AddGoalClientWrapper from 'components/AddGoal/AddGoalClientWrapper';
import GoalsList from 'components/GoalsList';

const Page = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGoalCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <GoalsList key={ refreshTrigger } />
      <AddGoalClientWrapper onGoalCreated={ handleGoalCreated } />
    </div>
  );
};

export default Page;
