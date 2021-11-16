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

    public matchPassword = (_ : any, val : string, callback : any) : void => {
        if (val === this.formRef?.current?.getFieldValue("password")) {
            callback();
        } else if(val) {
            callback("รหัสผ่านไม่ตรงกัน")
        } else {
            callback("กรุณากรอกรหัสผ่าน")
        }
    }

}