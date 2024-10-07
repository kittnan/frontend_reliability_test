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
import { GroupComponent } from './operate/group/group.component';
import { ItemsComponent } from './operate/items/items.component';
import { GroupDialogComponent } from './operate/group/group-dialog/group-dialog.component';
import { ItemsDialogComponent } from './operate/items/items-dialog/items-dialog.component';
import { TableComponent } from './chamber/table/table.component';
import { DialogAddComponent } from './chamber/table/dialog-add/dialog-add.component';
import { FunctionChamberComponent } from './master-manage/function-chamber/function-chamber.component';
import { DialogFunctionChamberComponent } from './master-manage/function-chamber/dialog-function-chamber/dialog-function-chamber.component';
import { RequestComponent } from './request/request.component';
import { SharedModule } from '../shared/shared.module';
import { ApproverComponent } from './approver/approver.component';
import { DialogApproverComponent } from './approver/dialog-approver/dialog-approver.component';
import { AdvanceModeComponent } from './advance-mode/advance-mode.component';
import { QrCodeChamberComponent } from './qr-code/qr-code-chamber/qr-code-chamber.component';
import { QrCodeOperateComponent } from './qr-code/qr-code-operate/qr-code-operate.component';
import { QrCodePreviewComponent } from './qr-code/qr-code-preview/qr-code-preview.component';
import { EquipmentComponent } from './operate/equipment/equipment.component';
import { ReportComponent } from './report/report.component';
import { Equipment2Component } from './equipment2/equipment2.component';
import { Equipment2NewComponent } from './equipment2-new/equipment2-new.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserManageComponent,
    DialogAddUserComponent,
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
    DialogTestingConditionComponent,
    GroupComponent,
    ItemsComponent,
    GroupDialogComponent,
    ItemsDialogComponent,
    TableComponent,
    DialogAddComponent,
    FunctionChamberComponent,
    DialogFunctionChamberComponent,
    RequestComponent,
    ApproverComponent,
    DialogApproverComponent,
    AdvanceModeComponent,
    QrCodeChamberComponent,
    QrCodeOperateComponent,
    QrCodePreviewComponent,
    EquipmentComponent,
    ReportComponent,
    Equipment2Component,
    Equipment2NewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[
    QrCodePreviewComponent
  ]
})
export class AdminModule { }
