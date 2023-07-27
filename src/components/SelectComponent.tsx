import React, {ReactElement} from 'react'
import {InputLabel, Select, MenuItem, FormControl, SelectChangeEvent} from "@mui/material";
import _ from 'lodash'

export type SelectItem<A = string> = {
    label: string
    value: A
}

export type SelectComponentProps<A> = {
    label: string
    items: Array<SelectItem<A>>
    onChange: ((a: A | undefined) => void)
}

export const SelectComponent = <A,>({
    label,
    items,
    onChange
}: SelectComponentProps<A>): ReactElement<any, any> => {

    const [value, setValue] = React.useState<number | ''>('')

    const onChangeLocal = (event: SelectChangeEvent<number>) => {

        const changedValue = event.target.value
        if(_.isNumber(changedValue) && changedValue < _.size(items)) {
            setValue(changedValue)
            onChange(_.get(items, changedValue).value)
        } else {
            onChange(undefined)
        }
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 140 }} size='small'>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChangeLocal}
                autoWidth
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={`${label}-menu-item-${index}`}
                        value={index}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
