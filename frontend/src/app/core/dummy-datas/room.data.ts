
export interface Room {
  key:string,
  value:string
}

export class RoomList {
  public static status: Room[] = [
		// ng-select => peoples
    {
     'key':'RM_1',
     'value':'Centro de cómputo',
    },
    {
      'key':'RM_2',
      'value':'Auditorio #1',
     },
     {
      'key':'RM_3',
      'value':'Sala de juntas',
     },
     {
      'key':'RM_4',
      'value':'Ingeniería #1',
     },
     {
      'key':'RM_5',
      'value':'Ingeniería #2',
     },
     {
      'key':'RM_6',
      'value':'Ingeniería #3',
     },
     {
      'key':'RM_7',
      'value':'Biblioteca',
     },
  ]
}