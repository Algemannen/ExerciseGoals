import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Input, FormControl, InputLabel, InputAdornment } from '@material-ui/core';

export default class FormDialog extends React.Component {
  state = {
    open: false,
    title: '',
    weight: '',
    date: '',
  };

  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onTitleChange = e => {
    this.setState({title: e.target.value})
  }
  onWeightChange = e => {
    this.setState({weight: e.target.value})
  }
  onDateChange = e => {
    this.setState({date: e.target.value})
  }

  open = () => {
    this.setState({open: true});
    return {title: this.state.title, weight: this.state.weight, date: this.state.date};
  }

  //TODO: make sure that the user can't enter empty title, weight or date

  render() {
    //console.log('title: ', this.state.title);
    //console.log('weight: ', this.state.weight);
    //console.log('date: ', this.state.date);
    const {open} = this.state;
    return (
      <div>
        <Dialog open={open} onClose={() => this.handleClose}
          onRef={ref => this.dialog = ref}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Goal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a goal, you need to provide a title, weight and date!
            </DialogContentText>
            <TextField required
              onChange ={this.onTitleChange}
              autoFocus
              margin="dense"
              id="addExerciseTitle"
              label="Title"
              type="title"
              fullWidth
            />
            <FormControl>
              <InputLabel>Weight(kg)</InputLabel>
              <Input required
                onChange = {this.onWeightChange}
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                autoFocus
                margin="dense"
                id="addExerciseWeight"
                label="Weight"
                type="number"
                fullWidth
              />
            </FormControl>
            <TextField required
              onChange = {this.onDateChange}
              autoFocus
              margin="dense"
              id="addExerciseDate"
              label="Completion Date"
              type="date"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}