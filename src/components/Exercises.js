import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider, IconButton, Button, Card, CardContent, AppBar, Input, TextField, InputAdornment, FormControl } from '@material-ui/core';

//import Delete from '@material-ui/icons/Delete';
//import AddIcon from '@material-ui/icons/Add';

//import AddExerciseDialog from '../components/dialogs/AddExercisesDialog';

const styles = {
    flex:{
        flex: 1,
    },
    card: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    }
}

class Exercises extends Component {

    state = {
        title: '',
        weight: '',
        date: '',
        id: '',
        errorMessage: '',
        motivationalMessage: 'Add new goals to complete!',
        exercises: [
            {title: 'Bench press', weight: 50, date: '31.07.19'},
            {title: 'Leg press', weight: 200, date: '31.07.19'},
            {title: 'Squats', weight: 50, date: '31.07.19'},
            
        ],
        completed: [
            {title: 'Biceps', weight: 10, date: '31.07.19'},
        ],
    }

    /*addExerciseDialog;

    open = () => {
        this.dialog.open();
        return true;
    }*/

    componentDidMont(nextProps, nextState){
        localStorage.setItem('exercises', JSON.stringify(this.state.exercises));
    }
    
    //Done: Make two functions that fetches exercises and completes from localStorage
    getExercisesFromLocalStorage = () => {
        //Fetching exercises from localStorage and parsing the string back to an object
        let exercises = JSON.parse(localStorage.getItem('exercises'));
        return exercises;
    }
    getCompletesFromLocalStorage = () => {
        //Fetching exercises from localStorage and parsing the string back to an object
        let completes = JSON.parse(localStorage.getItem('completes'));
        return completes;
    }
    

    //DONE: Find a way to append items into the array in localStorage
    //This function takes in a new exercise, checks if there are other exercises in the localstorage,
    //if so appens these exercises and the new one into a new list which is stored in local storage
    addExercisesToLocalStorage = (newExercise) => {
        //Make a new list
        let exercises = [];
        //Append the existing values into this list and add the latest one into the list
        let oldExercises = JSON.parse(localStorage.getItem('exercises')) || [];
        if(oldExercises.length > 0){
            oldExercises.map( i => exercises.push(i));
        }
        exercises.push(newExercise);
        localStorage.setItem('exercises', JSON.stringify(exercises));
    }

    //This function takes in a title and removes the object with that title from localStorage
    removeExercisesFromLocalStorage = (title) => {
        let exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        let filteredExercises = exercises.filter(exercise => exercise.title !== title);
        localStorage.setItem('exercises', JSON.stringify(filteredExercises));
        //Updates the elements on the page
        this.forceUpdate();
    }

    addCompletesToLocalStorage = (title) => {
        //console.log('title: ', title);
        //Make a new list
        let completes = [];
        //Append the existing values into this list and add the latest one into the list
        let oldComplete = JSON.parse(localStorage.getItem('completes')) || [];
        console.log('oldComplete: ', oldComplete);
        let exerciseList = JSON.parse(localStorage.getItem('exercises')) || [];
        console.log('exerciseList: ', exerciseList);
        if(oldComplete.length > 0){
            oldComplete.map(complete => completes.push(complete));
        }
        //If exercises contains elements we extract the element with the title we want to add to completes
        if(exerciseList.length > 0){
            let newComplete = exerciseList.filter(exercise => exercise.title === title);
            console.log('newComplete: ', newComplete);
            //console.log(newComplete.title === title);
            //Workaround!!
            //Should find a different way of making this work
            completes.push(newComplete[0]);
        }

        this.removeExercisesFromLocalStorage(title);
        
        localStorage.setItem('completes', JSON.stringify(completes));
    }

    //TODO: Remove completes from local storage
    //Should work after addCompletesToLocalStorage is done
    //This function takes in a title and removes the object with that title from localStorage
    removeCompletesFromLocalStorage = (title) => {
        let completes = JSON.parse(localStorage.getItem('completes')) || [];
        let filteredCompletes = completes.filter(complete => complete.title !== title);
        localStorage.setItem('completes', JSON.stringify(filteredCompletes));
        //Updates the elements on the page
        this.forceUpdate();
    }

    //TODO: Showcase this in the application

    //Refactor of those above, needs to be expanded to work
    getLocalStorage = (list) => {
        return localStorage.getItem(`${list}`);
    }

    setLocalStorage = (list, item) => {
        localStorage.setItem(`${list}`, JSON.stringify(item));
    }


    //TODO: add a field for index
    addGoal = () => {
        let {title, weight, date} = this.state;
        //console.log(date.length);
        if(title.length > 0 && weight > 0 && date.length === 10){
            this.setState({
                errorMessage: '',
                title: '',
                weight: '',
                date: '',
            });
            
            let exercise = {title: title, weight: weight, date: date}
            this.addExercisesToLocalStorage(exercise);
        } else if(weight < 0){
            this.setState({
                errorMessage: 'Weight has to be non-negative!'
            });
        } else{
            this.setState({
                errorMessage: 'The fields cannot be empty!'
            });
        }
        
    }

    //TODO: add index instead of title and localStorage
    //Function that takes in a title, removes the element with that title and updates the existing list
    removeGoals = (title) => {
        let {exercises} = this.state;
        let filteredItems = exercises.filter(i => { return i.title !== title});
        this.setState({
            exercises: filteredItems
        });
    }

    //Function that takes in a title, removes the element with that title and updates the existing list
    removeCompleted = (title) => {
        let {completed} = this.state;
        let filteredItems = completed.filter(i => { return i.title !== title});
        this.setState({
            completed: filteredItems
        });
    }

    //TODO: add goals to completed
    addToCompletedGoals = (title) => {
        let {exercises} = this.state;
        //Getting the completed item
        let completedItem = exercises.filter(i => { return i.title === title});
        //Getting the filtered list without the completed item
        let filteredItems = exercises.filter(i => { return i.title !== title});
        //Using the spread operator for completedItem since it is a list
        this.setState({
            completed: [...this.state.completed, ...completedItem],
            exercises: filteredItems,
        });
    }

    //TODO: edit goals, required functional dialogs
    editGoals = () => {

    }

    onTitleChange = e => {
        e.preventDefault();
        this.setState({
            title: e.target.value
        });
    }
    onWeightChange = e => {
        e.preventDefault();
        this.setState({
            weight: e.target.value
        });
    }
    onDateChange = e => {
        e.preventDefault();
        this.setState({
            date: e.target.value
        });
    }
    
    //TODO: several css fixes

    render() {
        //const { classes } = props;
        //const goal = this.addGoals('Leg press','100','10.04.19');
        //console.log(goal);
        //console.log("exercises: ", this.state.exercises);
        //console.log('completed: ', this.state.completed);
        let completed = this.getCompletesFromLocalStorage();
        let exercises = this.getExercisesFromLocalStorage();

        const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>;
        /*const editIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>;*/
        const checkBoxIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>;
        
        const checkedBoxIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>;

        
        return(
            <div className="application">
                <AppBar position='static'>
                    <Typography variant="h3" color="inherit">
                        Exercise Goals
                    </Typography>
                </AppBar>
                
                {/*So that we can get the data from the dialog using a reference, does not work at this time
                <AddExerciseDialog onRef={ref => this.addExerciseDialog = ref}/>
                */}
                <FormControl style={{border: '2px solid black', padding: '20px', margin: '30px'}}>
                <TextField
                    value={this.state.title}
                    style={{margin: '20px'}}
                    required
                    label="Title"
                    type="title"
                    onChange={this.onTitleChange}
                />
                <TextField
                    value={this.state.date}
                    style={{margin: '20px'}}
                    required
                    onChange={this.onDateChange}
                    label="Completion Date"
                    type="date"
                />
                <Input 
                    value={this.state.weight}
                    style={{margin: '35px'}}
                    required
                    onChange = {this.onWeightChange}
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    label="Weight"
                    type='number'
                />
                
                <Button variant="outlined" color="primary" onClick={this.addGoal}>
                    Add Goal
                </Button>

                </FormControl>
                <Typography variant="h5" color="error">
                {this.state.errorMessage}
                </Typography>
                
                <Typography variant="h5" color="inherit" style={{padding: '20px', textDecoration: 'underline' }}>
                    My Goals
                </Typography>
                {exercises === [] && <Typography>{this.state.motivationalMessage}</Typography>}
                
                {/*You cannot map over new Date() object */}
                <div className='cards'>
                    {exercises && exercises.map((exercise, index) =>
                        <Card key={index} style={{margin: ' 20px'}}>
                        
                            {<CardContent>
                                <Typography variant="h6">{exercise.title}</Typography>
                                <Typography>{exercise.weight} kg | {exercise.date}</Typography>
                                <IconButton onClick={() => this.addCompletesToLocalStorage(exercise.title)}>
                                    {checkBoxIcon}
                                </IconButton>
                                <IconButton onClick={() => this.removeExercisesFromLocalStorage(exercise.title)}>
                                    {deleteIcon}
                                </IconButton>
                            </CardContent>}
                        </Card>
                    )}
                </div>
                <Divider />
                <Typography variant="h5" color="inherit" style={{padding: '20px', textDecoration: 'underline'}}>
                        Completed Goals
                </Typography>
                <div className='cards'>
                    {completed && completed.map((complete, index) =>
                        <Card key={index + 1} style={{margin: '20px'}}>
                            {<CardContent>
                                <Typography variant="h6">{complete.title}</Typography>
                                <Typography>{complete.weight} kg | {complete.date}</Typography>
                                <IconButton disabled>
                                    {checkedBoxIcon}
                                </IconButton>
                                <IconButton onClick={() => this.removeCompletesFromLocalStorage(complete.title)}>
                                    {deleteIcon}
                                </IconButton>
                            </CardContent>}
                        </Card>
                    )}
                </div>
                <Typography style={{margin: '20px'}}>
                    Made by Jørgen Johansen, free to use on GitHub.
                </Typography>
            </div>
        );
    }
}

Exercises.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Exercises);
