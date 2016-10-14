import FieldStore from '../containers/FieldStore';


export type FormObject = { [key: string]: FieldStore | FormArray };

export type FormArray = FieldStore[] | FormObject[];

export type FormElement = FormObject | FormArray;
