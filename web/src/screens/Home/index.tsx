import PageLayout from 'layouts/PageLayout';
import Entries from 'modules/Entries';

export default function Home() {
  return (
    <PageLayout frontPage>
      <Entries />
    </PageLayout>
  );
}
