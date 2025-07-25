import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EquipmentHttpService } from 'src/app/http/equipment-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ScanHistoryHttpService } from 'src/app/http/scan-history-http.service';
import { GenerateCoverService } from 'src/app/services/generate-cover.service';

@Component({
  selector: 'app-qe-technical-request',
  templateUrl: './qe-technical-request.component.html',
  styleUrls: ['./qe-technical-request.component.scss']
})
export class QeTechnicalRequestComponent implements OnInit {
  userLogin: any = null;
  request: any = null;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  planing: any = null;
  equipments: any = null
  constructor(
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private $scanHistory: ScanHistoryHttpService,
    // private $trackingOperate: TrackingOperateHttpService,
    private $equipment: EquipmentHttpService,
    private $generateCover: GenerateCoverService

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);

  }

  async ngOnInit(): Promise<void> {
    try {
      let dataParam: HttpParams = new HttpParams()
      // dataParam = dataParam.set('status', JSON.stringify(['normal']))
      const resTracking = await this.$equipment.get(dataParam).toPromise()
      this.equipments = resTracking

      this.routeActive.queryParams.subscribe(async (params: any) => {
        const { id, editPlan } = params;
        const resData = await this.$request.get_id(id).toPromise();
        this.request = resData[0];
        // const resScan = await this.$scanHistory.get(new HttpParams().set('runNo', JSON.stringify([this.request.step1.controlNo]))).toPromise()
        // this.request.queues = this.request.queues.map((a: any) => {
        //   a['inspectionTime'] = a['inspectionTime'].map((b: any) => {

        //     const historyScanInput = resScan.filter((scan: any) => scan.at == b.at && scan.status == 'in' && scan.condition.name == a.condition.name)

        //     const historyScanOutput = resScan.filter((scan: any) => scan.at == b.at && scan.status == 'out' && scan.condition.name == a.condition.name)

        //     return {
        //       ...b,
        //       input: historyScanInput ? historyScanInput : [],
        //       output: historyScanOutput ? historyScanOutput : [],
        //     }
        //   })
        //   return a
        // })
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollTo('down')
    }, 1000);
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  jump2(id: string) {
    setTimeout(() => {
      (document.getElementById(id) as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500);
  }

  generateCover() {
    try {
      this.$generateCover.generateCover(this.request)
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }

}
