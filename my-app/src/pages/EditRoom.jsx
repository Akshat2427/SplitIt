import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { FirebaseContext } from '../context/firebase';
import './EditRoom.css';

function EditRoom() {
    const param = useParams();
    const data = useContext(FirebaseContext);
    const [name, setName] = useState("");
    const [amt, setAmt] = useState("");
    const [descr, setDescr] = useState("");
    const [expense, setExpense] = useState([]);
    const [average, setAverage] = useState(0);
    const [report, setReport] = useState("");
    const [output, setOutput] = useState(null);
    const [showInstructions, setShowInstructions] = useState(true);
    const [users , setUsers] = useState(null);
    useEffect(() => {
        manageData(param.id);
    }, [param.id]);

    async function manageData(id) {
        let obj = await data.fetchExpenseFromEditRoom(id);
        setExpense(obj.dataArray);
        console.log("obj", obj);
        console.log("expense", expense);
        setUsers(obj.info);
        console.log("info", users);
    }

    function doMaths(updatedInfo = expense) {
        // let newExpense = updatedInfo.map(e=>{
        //     return {name:e.data.name , amt:e.data.amt }
        // })
        let mp = new Map();
        console.log("updatedInfo",updatedInfo);
        updatedInfo.forEach(e=>{
            if(mp.has(e.data.name)){
                
                mp.set(e.data.name , parseInt(mp.get(e.data.name)) + parseInt(e.data.amt))
            }else{
                mp.set(e.data.name , parseInt(e.data.amt))
            }
        })
        console.log("map" , mp);
        let newExpense = []
        for(let [key , value] of mp){
            newExpense.push({name:key , amt:parseInt(value)})
        }
        console.log("newExpenses" ,newExpense);
        users.forEach(e=>{
            let flag = newExpense.find(f=>{
                return f.name == e.name
            })
            if(!flag){
                newExpense.push({name:e.name , amt:0})
            }
        })
        updatedInfo = newExpense
        console.log("updataed info" , updatedInfo);
        for (let user of updatedInfo) {
            if (!user.name.trim()) {
                alert("All name fields must be filled.");
                return;
            }
        }

        let total = 0;
        let arr = [];
        let tempReport = "";
        updatedInfo.forEach((user, index) => {
            const amount = parseFloat(user.amt) || 0;
            total += amount;
            arr.push({ amt: amount, index });
        });

        const avg = total / updatedInfo.length;
        setAverage(avg);

        arr.sort((a, b) => a.amt - b.amt);

        let i = 0,
            j = arr.length - 1;
        let results = [];

        while (i < j) {
            const pending = avg - arr[i].amt;
            const want = arr[j].amt - avg;

            if (want > pending) {
                results.push(
                    `${updatedInfo[arr[i].index].name} gives ${pending.toFixed(2)} to ${updatedInfo[arr[j].index].name}`
                );

                arr[j].amt -= pending;
                i++;
            } else {
                if (want > 0)
                    results.push(
                        `${updatedInfo[arr[i].index].name} gives ${want.toFixed(2)} to ${updatedInfo[arr[j].index].name}`
                    );
                arr[i].amt += want;
                j--;
            }
        }
console.log("results" , results);
        setOutput(results);
        setShowInstructions(false);
        setReport(results.join("\n"));
        console.log("output", report);
    }

    const handleSave = async () => {
        if (!name || !amt) {
            alert("Name and Amount are required fields.");
            return;
        }
        await data.addExpenseInEditRoom({ name, amt, descr }, param.id);
        setName("");
        setAmt("");
        setDescr("");
        manageData(param.id); 
    };

    return (
        <div className="edit-room-container">
            <div className="edit-room-form">
                <h1>ADD New Expense</h1>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" value={amt} onChange={e => setAmt(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" cols="50" value={descr} onChange={e => setDescr(e.target.value)}></textarea>
                </div>
                <button type="submit" onClick={handleSave}>Save</button>
                <button type="submit" onClick={e => { manageData(param.id) }}>Show Data</button>
                <button type="submit" onClick={e => { doMaths(expense) }}>Calculate Expense</button>
            </div>
            <div className="expense-list">
                {expense && expense.length === 0 ? (
                    <div className="no-expense-card">
                        <h3>Click "Show Data" to display expenses</h3>
                    </div>
                ) : (
                    expense && expense.map((e, index) => (
                        <div key={index} className="expense-item">
                            <h3>{e.data.name}</h3>
                            <p>{e.data.amt}</p>
                            <p>{e.data.descr}</p>
                        </div>
                    ))
                )}
                {expense === null ? <h1 align="center">No data Found</h1> : null}
            </div>
            <div className="expense-report">
               {report &&
                    
                    <div>
                        <h1>Expense Report</h1>
                        <p>{report}</p>
                    </div>
                    }
            </div>
        </div>
    );
}

export default EditRoom;