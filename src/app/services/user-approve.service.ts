import { ApproverHttpService } from './../http/approver-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApproveService {

  constructor(
    private $user: UserHttpService,
    private $approver: ApproverHttpService
  ) { }


  async getUserApprove(userLogin: any, authorize: any) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    userLogin = JSON.parse(userLoginStr)

    let section = [localStorage.getItem('RLS_section')]

    // const section = [userLogin.section]
    let section_str = JSON.stringify(section)
    if (authorize === 'qe_window_person' || authorize === 'request') {
      section_str = '[]'
    }

    const level = [authorize]
    const temp_level = JSON.stringify(level)
    let userApprove = []
    userApprove = await this.$user.getUserBySection(section_str, temp_level).toPromise();
    // userApprove = userApprove.filter((u: any) => u._id != userLogin._id)
    userApprove = userApprove.map((user: any) => {
      const sptName: string[] = user.name.trim().split(' ').filter((d: any) => d != '')
      const fName: string = sptName[0]
      const lName: string = sptName.length > 1 ? '-' + sptName[1].split('')[0] : ''
      return {
        ...user,
        name: `${fName}${lName}`
      }
    })

    return userApprove
  }

  async approver(auth: string, formLevel: any, userLogin: any) {
    const approver = await this.$approver.get().toPromise()
    if (approver && approver.length != 0) {
      const useApprover = approver.find((ap: any) => ap.level == formLevel)
      return useApprover

    }
    return undefined
  }



}
