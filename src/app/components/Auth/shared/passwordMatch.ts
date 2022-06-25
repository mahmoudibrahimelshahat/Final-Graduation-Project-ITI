
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatch: ValidatorFn =
        (control: AbstractControl): ValidationErrors | null =>{
        let passControl= control.get('password');
        let confirmPassControl= control.get('confirmPassword');
        if(!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value)
            return null;

        let valErr = {'UnmathedPassword': {'pass': passControl?.value, 'confirmPass': confirmPassControl?.value}};
        return (passControl?.value==confirmPassControl?.value)? null : valErr;
    }