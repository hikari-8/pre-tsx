import { useState, FC, ReactNode } from "react";
import "./App.css";

type Todo = {
	value: string;
	// children: ReactNode;
};

//indexを示唆するものが書いてなかった
export const App: FC = () => {
	const [inputTodo, setInputTodo] = useState<Todo>("");
	const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const onClickAddTodo = () => {
		const addNewTodoFunc: Todo[] = [...incompleteTodos, inputTodo];
		if (inputTodo) {
			setIncompleteTodos(addNewTodoFunc);
			setInputTodo("");
		}
	};

	const onClickCompleteTodo = (index: number) => {
		const newincompleteTodos = [...incompleteTodos];
		newincompleteTodos.splice(index, 1);
		console.log(index); //なぜnumberではなくプロトタイプが入っているのだろうか
		const newCompletedTodos = [...completedTodos, incompleteTodos[index]];
		setIncompleteTodos(newincompleteTodos);
		setCompletedTodos(newCompletedTodos);
	};

	const onClickDeleteTodo = (index: number) => {
		const deleteTodo = [...completedTodos];
		deleteTodo.splice(index, 1);
		setCompletedTodos(deleteTodo);
	};

	const deleteIncompleteTodo = (index: number) => {
		const deleteIncompleteTodo = [...incompleteTodos];
		deleteIncompleteTodo.splice(index, 1);
		setIncompleteTodos(deleteIncompleteTodo);
	};

	const onClickReturnTodo = (index: number) => {
		const deleteReturnTodo = [...completedTodos];
		deleteReturnTodo.splice(index, 1);
		const returnIncompleteTodo = [...incompleteTodos, completedTodos[index]];
		setIncompleteTodos(returnIncompleteTodo);
		setCompletedTodos(deleteReturnTodo);
	};

	return (
		<div className="App">
			{/* inputArea */}
			<div>
				<input
					type="text"
					value={inputTodo}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setInputTodo(e.target.value)
					}
					placeholder="TODOを入力"
				/>
				<button onClick={onClickAddTodo}>追加</button>
			</div>

			<div className="incompleteTodos">
				<ul>
					<h3>未完了のタスク</h3>
					{incompleteTodos.map((todo: Todo, index: number) => {
						return (
							<div key={index}>
								<li>
									{todo}
									<button onClick={() => onClickCompleteTodo(index)}>
										完了
									</button>
									<button onClick={() => deleteIncompleteTodo(index)}>
										削除
									</button>
								</li>
							</div>
						);
					})}
				</ul>
			</div>

			<div className="completedTodos">
				<ul>
					<h3>完了したタスク</h3>
					{completedTodos.map((todo: Todo, index: number) => {
						return (
							<div key={index}>
								<li>
									{todo}
									<button onClick={() => onClickDeleteTodo(index)}>削除</button>
									<button onClick={() => onClickReturnTodo(index)}>戻す</button>
								</li>
							</div>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
