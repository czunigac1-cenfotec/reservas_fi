
export interface ApprobalStatus {
  key:string,
  value:string
}

export class ApprobalStatusList {
  public static status: ApprobalStatus[] = [
		// ng-select => peoples
    {
     'key':'APPROVED',
     'value':'Aprobado',
    },
    {
      'key':'REJECTED',
      'value':'Rechazado',
     },
  ]
}