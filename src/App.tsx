import React from 'react';
import { useState } from "react";
import { useStore } from "./todoStore";
 
import {
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
	headerTextStyles: {
		textAlign: "center",
		marginBottom: theme.spacing(3),
	},
	textBoxStyles: {
		marginBottom: theme.spacing(1),
	},
	addButtonStyles: {
		marginBottom: theme.spacing(2),
	},
	completedTodoStyles: {
		textDecoration: "line-through",
	},
}));

function App() {
	const {
		headerTextStyles,
		textBoxStyles,
		addButtonStyles,
		completedTodoStyles
	} = useStyles();
	const [todoText, setTodoText] = useState("");
	const store = useStore();

	return (
		<Container maxWidth="xs">
			<Typography variant="h3" className={headerTextStyles}>
				My fabulous to-do list
			</Typography>
			<TextField
				className={textBoxStyles}
				label="Todo description"
				required
				variant="outlined"
				fullWidth
				onChange={(e) => setTodoText(e.target.value)}
				value={todoText}
			/>
			<Button
				className={addButtonStyles}
				fullWidth
				variant="outlined"
				color="primary"
				onClick={() =>
				{
					if (todoText.length)
					{
						store.addTodo(todoText);
						setTodoText("");
					}
				}}
			>
				Add item
			</Button>
			<List>
				{store.todos.map((todo) => (
					<ListItem key={todo.id}>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={todo.completed}
								onChange={() => store.toggleCompletedState(todo.id)}
							/>
						</ListItemIcon>
						<ListItemText
							className={todo.completed ? completedTodoStyles : ""}
							key={todo.id}
						>
							{todo.description}
						</ListItemText>
						<ListItemSecondaryAction>
							<IconButton
								onClick = {() =>
								{
									store.removeTodo(todo.id);
								}}
							>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Container>
	);
}

export default App;
