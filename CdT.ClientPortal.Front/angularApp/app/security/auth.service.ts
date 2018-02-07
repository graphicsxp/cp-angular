import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(userName: string, password: string): boolean {
    localStorage.setItem('token', `d3EDKwreeVn5GGMok7r2MJ72pSpLu3fWA9PR8CLj5ECG_8GzzX3aGqfgS-Mw1ejdNpXSmi9LuS4KL7u1YlW5
    aU4k3nYOu3zUcV3Qv25KjDi6bj9uwihY1jpmMTDC2bUzwEpNsuPylKJhf1tBs5Z90Ok95JIJr2sjheZ-sbpPuVT2RcrwM0-a9QK5uuDCCr9Ksq9f612Xv
    QcBvpglrGCrwunCzfZkMViXdwzEYY-RQg-PHhCDI5wt2IGV917IVcbQFmYT1t9a89MgxyhpnaKeEkdIf3_eY4D5KtwYdrBGggxQ8Da3Fy_RNVVBxGPBu5
    96RpzIXWFqabBt7hvK3ZxjA6zxT8s4icvqka2BEAnP_p-TbseJ0_491OeIh2obedmOlVZcH_rqb4BcnP8pAFQFg-UgkFxP3X341-Azl48gnJmVhLibgM8
    aF0j38-wil6ENLi3f4odb9DRjJHvDuPP9S_OJFS5jTlU8WH1pjyMBwkg`)
    return true;
  }
}
