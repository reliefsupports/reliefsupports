// import { getDocuments } from 'hooks/useGetDocuments';
import { useGetDocuments } from 'hooks/useGetDocuments';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default function Request() {
  const { data, getDocuments } = useGetDocuments();
  useEffect(() => {
    getDocuments({ query: 'request' });
  }, [data]);

  return (
    <>
      <div style={{ padding: '20px' }}>
        <div>
          <Button>Add Requests</Button>
        </div>
        <br />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>District</th>
              <th>Description</th>
              {/* <th>Tags</th> */}
              <th>Prority</th>
              <th>Category</th>
              <th>Responses</th>
              <th>Status</th>
              {/* <th>Is Verified</th> */}
              {/* <th>Posted By</th> */}
              {/* <th>Logs</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((d) => (
              <tr>
                <td>{d.attributes.district}</td>
                {/* <td>{d.attributes.createdAt.toDateString()}</td> */}
                <td>{d.attributes.description}</td>
                <td>{d.attributes.priority}</td>
                <td>{d.attributes.category}</td>
                <td>{d.attributes.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
