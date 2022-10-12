import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAddUserComponent } from './user-manage/dialog-add-user/dialog-add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { MasterManageComponent } from './master-manage/master-manage.component';
import { DepartmentComponent } from './master-manage/department/department.component';
import { DialogDepartmentComponent } from './master-manage/department/dialog-department/dialog-department.component';
import { ModelMasterComponent } from './master-manage/model-master/model-master.component';
import { DialogModelMasterComponent } from './master-manage/model-master/dialog-model-master/dialog-model-master.component';
import { TestPurposeMasterComponent } from './master-manage/test-purpose-master/test-purpose-master.component';
import { DialogTestPurposeComponent } from './master-manage/test-purpose-master/dialog-test-purpose/dialog-test-purpose.component';
import { TestingTypeMasterComponent } from './master-manage/testing-type-master/testing-type-master.component';
import { DialogTestingTypeComponent } from './master-manage/testing-type-master/dialog-testing-type/dialog-testing-type.component';
import { IntervalMasterComponent } from './master-manage/interval-master/interval-master.component';
import { DialogIntervalComponent } from './master-manage/interval-master/dialog-interval/dialog-interval.component';
import { SectionMasterComponent } from './master-manage/section-master/section-master.component';
import { DialogSectionComponent } from './master-manage/section-master/dialog-section/dialog-section.component';
import { DialogAuthorizeComponent } from './master-manage/authorize-master/dialog-authorize/dialog-authorize.component';
import { AuthorizeMasterComponent } from './master-manage/authorize-master/authorize-master.component';
import { TestingConditionMasterComponent } from './master-manage/testing-condition-master/testing-condition-master.component';
import { DialogTestingConditionComponent } from './master-manage/testing-condition-master/dialog-testing-condition/dialog-testing-condition.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserManageComponent,
    DialogAddUserComponent,
    MasterManageComponent,
    DepartmentComponent,
    DialogDepartmentComponent,
    ModelMasterComponent,
    DialogModelMasterComponent,
    TestPurposeMasterComponent,
    DialogTestPurposeComponent,
    TestingTypeMasterComponent,
    DialogTestingTypeComponent,
    IntervalMasterComponent,
    DialogIntervalComponent,
    SectionMasterComponent,
    DialogSectionComponent,
    DialogAuthorizeComponent,
    AuthorizeMasterComponent,
    TestingConditionMasterComponent,
    DialogTestingConditionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
