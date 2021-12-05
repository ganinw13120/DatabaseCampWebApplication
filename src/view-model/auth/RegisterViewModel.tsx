// RegisterViewModel.tsx
/**
 * This file contains view-model, related to register page.
*/

import React from 'react';
import IAuthViewModel from './IAuthViewModel';
import { FormInstance } from 'antd/es/form';

import { IRegisterPage } from '@view/register/RegisterPage';


export default class RegisterViewModel implements IAuthViewModel {

    private formRef: React.RefObject<FormInstance<any>>;
    private displayText: string;
    private isLoading: boolean;

    private baseView?: IRegisterPage;

    public constructor() {
        this.isLoading = false;
        this.displayText = '';
        this.formRef = React.createRef<FormInstance>();
    }

    /**
     * Get form input reference
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Form input reference
     */
    public getFormRef(): React.RefObject<FormInstance<any>> {
        return this.formRef
    }

    /**
     * Get display text
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Activity information
     */
    public getDisplayText(): string {
        return this.displayText;
    }

    /**
     * Get is application loading
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Is loading data
     */
    public getIsLoadng(): boolean {
        return this.isLoading;
    }


    /**
     * On attach view, initailize view-model
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    public attachView = (baseView: IRegisterPage): void => {
        this.baseView = baseView;
    }

    /**
     * On view detach, remove view
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    public detachView = (): void => {
        this.baseView = undefined;
    }

    /**
     * On user submit input form, submitting information
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    public OnFinish = async (): Promise<void> => {
        this.isLoading = true;
        this.baseView?.onViewModelChanged();

        await this.baseView?.props.authStore!.Register(
            this.formRef?.current?.getFieldValue("name"),
            this.formRef?.current?.getFieldValue("email"),
            this.formRef?.current?.getFieldValue("password"),
            (res: { issuccess: boolean, message: string }) => {
                this.isLoading = false;
                this.displayText = res.message;
                this.baseView?.onViewModelChanged();
                if (res.issuccess) {
                    this.baseView?.props?.history?.push('/overview');
                }
            }
        )
    }

    /**
     * On user select login page, take user to login page
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    public onChangePage = (): void => {
        this.baseView?.props?.history?.push('/login');
    }

    /**
     * On user fill password confirmation, validate if match with other password input
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    public matchPassword = (_: any, val: string, callback: any): void => {
        if (val === this.formRef?.current?.getFieldValue("password")) {
            callback();
        } else if (val) {
            callback("รหัสผ่านไม่ตรงกัน")
        } else {
            callback("กรุณากรอกรหัสผ่าน")
        }
    }
}