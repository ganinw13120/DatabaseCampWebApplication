import React from 'react';
import IAuthViewModel from './IAuthViewModel';
import BaseView from '../../view/BaseView';
import { FormInstance } from 'antd/es/form';


export default class RegisterViewModel implements IAuthViewModel {

    public formRef?: React.RefObject<FormInstance<any>>;
    public displayText: string;
    public isLoading: boolean;

    private baseView?: BaseView;

    public constructor() {
        this.isLoading = false;
        this.displayText = '';
        this.formRef = React.createRef<FormInstance>();
    }

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    };

    public detachView = (): void => {
        this.baseView = undefined;
    };
    public OnFinish = async (): Promise<void> => {
        this.isLoading = true;
        this.baseView?.onViewModelChanged();
        
        await this.baseView?.props.authStore.Register(
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
    public onClickLoginButton = (): void => {
        this.baseView?.props?.history?.push('/login');
    }

    public matchPassword = (password_confirmation: String) => {
        if (password_confirmation === this.formRef?.current?.getFieldValue("password")) {
            return null;
        } else {
            return "รหัสผ่านไม่ตรงกัน"
        }
    }


    public validateEmail = (email: String) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(email.toLowerCase());
        if (!validEmail) {
            return "กรุณากรอกอีเมลให้ถูกต้อง"
        } else {
            return null;
        }
    }


}