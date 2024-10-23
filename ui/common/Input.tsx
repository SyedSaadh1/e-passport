import React, { useCallback } from 'react';
import { DatePicker, DatePickerValue, SelectItemProps, TextInput, Select, SelectItem, SearchSelectItem, SearchSelect } from '@tremor/react';
import CaptureSelfieImage from '../Camera.tsx/CaptureSelfieImage';
import Spinner from './spinner';


function Input({
	label,
	type,
	id,
	required,
	error,
	search = false,
	options = [],
	onChange,
	loading,
	...otherProps
}: any) {

	const handleChange = useCallback((file: File) => {
		if (onChange) {
			onChange({
				target: {
					name: id,
					id,
					files: file ? [file] : []
				}
			})
		}
	}, [id, onChange])

	const props = {
		id,
		name: id,
		...otherProps
	}

	let component = <TextInput
		type={type}
		onChange={onChange}
		{...props}

	/>

	// if (type === "date") {
	// 	const handleChange = (value: DatePickerValue) => {
	// 		if (onChange) {
	// 			onChange({ target: { name: id, value: value } })
	// 		}
	// 	}
	// 	component = <DatePicker
	// 		onValueChange={handleChange}
	// 		enableYearNavigation={true}
	// 		showYearDropdown={true}
	// 		{...props}
	// 	/>
	// }

	if (String(type).includes('selfie')) {
		component = <CaptureSelfieImage onChange={handleChange} video={type?.toLowerCase().includes('video')} />
	}

	if (type === "select") {
		const handleChange = (value: SelectItemProps) => {
			if (onChange) {
				onChange({ target: { name: id, value: value } })
			}
		}

		const Component: any = search ? SearchSelect : Select;
		const Item: any = search ? SearchSelectItem : SelectItem;

		component = <Component onValueChange={handleChange} defaultValue={otherProps?.value}>
			{(options || []).map((option: any) => <Item className="capitalize" key={option} value={option}>{option}</Item>)}
		</Component>
	}

	return <div>
		<label
			htmlFor={id}
			className="text-tremor-default mb-2 block font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
		>
			{label}
			{required && <span className="text-red-500">*</span>}
		</label>
		<div className='relative'>
			{component}
			{loading && <div className='absolute right-0 top-0 h-full rounded-tremor-default flex items-center p-2'>
				<Spinner />
			</div>}
		</div>
		{error && <p className="text-red-500">{String(error)}</p>}
	</div>
}

export default React.memo(Input);