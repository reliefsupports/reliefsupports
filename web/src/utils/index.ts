import qs from 'qs';
import { isEmpty } from 'lodash';

const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

const query = ({
  district,
  priority,
  category,
  type,
}: {
  district?: string;
  priority?: string;
  category?: string;
  type: string;
}) => {
  return qs.stringify(
    {
      filters: {
        $and: [
          {
            district: {
              $eq: !isEmpty(district) ? district : undefined,
            },
          },
          {
            priority: {
              $eq: !isEmpty(priority) ? priority : undefined,
            },
          },
          {
            category: {
              $eq: !isEmpty(category) ? category : undefined,
            },
          },
        ],
        type: {
          $eq: type,
        },
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
};
export { capitalize, query };
