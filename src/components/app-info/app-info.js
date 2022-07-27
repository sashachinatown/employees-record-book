
import './app-info.css'

const AppInfo = ({totalEmployees, totalBonus}) => {

    return (
        <div className="app-info">
            <h1>Employees record</h1>
            <h2>Total employees amount: {totalEmployees}</h2>
            <h2>Employees to receive bonus: {totalBonus}</h2>
        </div>
    )
}

export default AppInfo;