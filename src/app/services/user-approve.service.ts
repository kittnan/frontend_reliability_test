import { UserHttpService } from 'src/app/http/user-http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApproveService {

  constructor(
    private $user: UserHttpService
  ) { }


  async getUserApprove(userLogin: any, authorize: any) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    userLogin = JSON.parse(userLoginStr)
    const section = [userLogin.section]
    const temp_section = JSON.stringify(section)
    const level = [authorize]
    const temp_level = JSON.stringify(level)
    let userApprove = []
    userApprove = await this.$user.getUserBySection(temp_section, temp_level).toPromise();
    userApprove = userApprove.filter((u: any) => u._id != userLogin._id)
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
}