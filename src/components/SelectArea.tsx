import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { Area } from '../models/enums';

export const SelectArea = ({ area, areas, onSelect }: ISelectAreaProps) => {
    const [selectedArea, setSelectedArea] = useState('main');

    useEffect(() => {
        setSelectedArea(area || 'main');
    }, [area]);

    const areaOptions = areas.map((a) => (
        <Select.Option key={a} value={a}>
            {a.toUpperCase()}
        </Select.Option>
    ));

    const handleChange = (value: SelectValue) => {
        onSelect(value as Area);
    };

    return (
        <Select
            defaultValue={selectedArea}
            className="dropdown"
            onChange={handleChange}
            value={selectedArea}
        >
            {areaOptions}
        </Select>
    );
};

interface ISelectAreaProps {
    area?: Area;
    areas: Area[];
    onSelect: (selected: Area) => void;
}
