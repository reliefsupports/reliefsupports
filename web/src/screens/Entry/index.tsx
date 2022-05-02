import { useLocation } from 'react-router-dom';

import PageLayout from 'layouts/PageLayout';

export default function EntrySingle() {
  const location = useLocation();

  return (
    <PageLayout>
      <pre>{JSON.stringify(location.state, null, 2)}</pre>
    </PageLayout>
  );
}
