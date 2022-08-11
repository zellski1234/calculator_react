import './App.css';
import { useState } from 'react';
import { evaluate } from "mathjs";

function App() {
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("")

	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = (value) => {
		// updateCalc Value contains any ops 
		// and nothing or any ops and last ops digit 
		// is an ops value
		// doesn't let you add multiple operators
		if (
			(ops.includes(value) && calc === '') ||
			(ops.includes(value) && ops.includes(calc.slice(-1)
			))
		) {
			return;
		}

		setCalc(calc + value);

		if (!ops.includes(value)) {
			setResult(evaluate(calc + value).toString());
		}
	}

	// equal function calculates strings from display
	function calculate (){
		setCalc(evaluate(calc).toString());
	}

	// DEL function removes last string on display by
	//  slice last string
	function deleteLast (){
		if (calc === '') {
			return;
		}

		const value = calc.slice(0, -1);
		
		setCalc(value);
	}


	const createDigits= () =>{
		const digits = [];
		// creates digits and buttons between 1-9
		for (let i = 1; i < 10; i++){
			digits.push(
				// .toString() coverts digits to strings
				<button 
					onClick={() => updateCalc(i.toString())} 
					key={i}>
					{i}
				</button>
			)
		}

		return digits;
	}

	return (
		<div className="App">
			<h1>Calculator</h1>
			<div className="calculator">
				<div className="display">
					{/* if result contains a result 
					 display result else display nothing */}
					{ result ? <span>({result})</span> : ''}&nbsp;
					{/* displays button inputs or 0 */}
					{ calc || "0"}
				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}>/
					</button>
					<button onClick={() => updateCalc('*')}>*
					</button>
					<button onClick={() => updateCalc('+')}>+
					</button>
					<button onClick={() => updateCalc('-')}>-
					</button>

					<button onClick={deleteLast}>DEL</button>
				</div>

				<div className="digits">
					{ createDigits() }
					<button onClick={() => updateCalc('0')}
					>0</button>
					<button onClick={() => updateCalc('.')}
					>.</button>

					<button onClick={calculate}>=</button>
				</div>
			</div>
		</div>
	);
}

export default App;
