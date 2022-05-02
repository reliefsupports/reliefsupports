import Stack from '@mui/material/Stack';
import PaginationMUI from '@mui/material/Pagination';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin: 30px 0;
`;

export default function Pagination() {
  return (
    <Container>
      <Stack spacing={2}>
        <PaginationMUI count={10} />
      </Stack>
    </Container>
  );
}
