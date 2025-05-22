import { auth } from '../../lib/auth';
import AddGoal from 'components/AddGoal/AddGoal';
import GoalsList from 'components/GoalsList';

const Page = async () => {
  const session = await auth();
  return (
    <div>
      This is goals page
      <GoalsList/>
      <AddGoal userId={ session?.user?.id as string } />
    </div>
  );
};

export default Page;
