import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default function Request() {
  return (
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
            <th>Tags</th>
            <th>Prority</th>
            <th>Category</th>
            <th>Responses</th>
            <th>Status</th>
            <th>Is Verified</th>
            <th>Posted By</th>
            <th>Logs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Colombo</td>
            <td>Need Emergency Medicine</td>
            <td>Medicine</td>
            <td>High</td>
            <td>Medicine</td>
            <td>NOne</td>
            <td>Active</td>
            <td>Verified</td>
            <td>Harrish</td>
            <td>none</td>
          </tr>
          {/* <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}
