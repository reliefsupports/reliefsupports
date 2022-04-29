import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useCreateDocument } from 'hooks/useCreateDocument';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function AddDataModal (props: any) {

  const createDocumentAPI = useCreateDocument();

  const [district, setDistrict] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleChangeDistrict = (event: any) => {
    setDistrict(event.target.value);
  };

  const handleChangePriority = (event: any) => {
    setPriority(event.target.value);
  };

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };

  React.useEffect(() => {
    if (props.method === 'update') {
      console.log(props.id); // If 'update' pass document ID as prop
      //Todo : Get current data
      //Todo : Set values to states (district, priority, category, description)
    }
  }, [])

  const handleSubmit = () => {
    const data = {
      type: props.type,
      district,
      description,
      priority,
      category
    }
    if (props.method === 'add') {
      // Todo : add document
      console.log(data)
      // createDocumentAPI.createDocument(data);
    } else {
      // Todo : update document
      // createDocumentAPI.createDocument(data);
    }
  }

  const districts = ['Colombo', 'Gampaha', "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambanthota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullativ", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"];
  const priorities = ['High', 'Medium', "Low"];
  const categories = ['Medicine', 'Food', "Transport"];

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            {props.moethod === "add" ? 'Add' : 'Update'} New {props.type === 'offer' ? 'Offer' : 'Request'} Form
          </Typography>
          {/* <form> */}
            <FormControl fullWidth style={{marginTop:20}}>
              <InputLabel id="district-select-label">District</InputLabel>
              <Select
                labelId="district-select-label"
                id="district-select"
                value={district}
                label="District"
                onChange={handleChangeDistrict}
              >
                {districts.map(el => {
                  return <MenuItem key={el} value={el}>{el}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <div style={{marginTop:20}}>
              <TextField 
                multiline 
                rows={4} 
                maxRows={50} 
                required 
                fullWidth 
                value={description} 
                onChange={handleChangeDescription} 
                id="outlined-basic" 
                label="Description" 
                variant="outlined" 
              />
            </div>
            <FormControl fullWidth style={{marginTop:20}}>
              <InputLabel id="priotity-select-label">Priority</InputLabel>
              <Select
                labelId="priotity-select-label"
                id="priority-select"
                value={priority}
                label="Priority"
                onChange={handleChangePriority}
              >
                {priorities.map(el => {
                  return <MenuItem key={el} value={el}>{el}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop:20}}>
              <InputLabel id="category-select-label">Categoty</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Categoty"
                onChange={handleChangeCategory}
              >
                {categories.map(el => {
                  return <MenuItem key={el} value={el}>{el}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <div style={{marginTop:20}}>
              <Button 
                type="submit" 
                variant="outlined" 
                onClick={handleSubmit}
                disabled={!(district && category && priority && description)}
              >
                Submit
              </Button>
            </div>
          {/* </form> */}
        </Box>
      </Modal>
    </div>
  );
}