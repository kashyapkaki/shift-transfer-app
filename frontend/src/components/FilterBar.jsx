import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        shift: "",
        status: "",
        priority: "",
        sort: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div>
            <select name="shift" onChange={handleChange}>
                <option value="">All Shifts</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night">Night</option>
            </select>
            <select name="status" onChange={handleChange}>
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <select name="priority" onChange={handleChange}>
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select name="sort" onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="priority">Priority</option>
                <option value="-priority">Priority (Descending)</option>
                <option value="status">Status</option>
            </select>
        </div>
    );
};

export default FilterBar;
