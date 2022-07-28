import './app-filter.css';


const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'All employees'},
        {name: 'promotion', label: 'To promotion'},
        {name: 'moreThan1000', label: 'Salary >1000$'},
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const classs = active ? 'btn-light' : 'btn-outline-light'
        return (
            <button 
                className={`btn ${classs}`}
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;