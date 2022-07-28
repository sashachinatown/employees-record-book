import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Alex K.', salary: 800, bonus: false, promotion: true, id: 1},
                {name: 'Smith W.', salary: 3000, bonus: true, promotion: false, id: 2},
                {name: 'Robert D. Jr.', salary: 5000, bonus: false, promotion: false, id: 3}
            ],
            term: '',
            filter: ''
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            bonus: false,
            promotion: false, 
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        } 
    
        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterEmployee = (items, filter) => {
        switch (filter) {
            case 'promotion':
                return items.filter(item => item.promotion)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items   
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const totalEmployees = data.length;
        const totalBonus = data.filter(item => item.bonus).length;
        const visibleData = this.filterEmployee(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                    totalEmployees={totalEmployees}
                    totalBonus={totalBonus}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;