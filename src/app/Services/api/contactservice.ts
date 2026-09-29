import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Contactservice {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Ocp-Apim-Subscription-Key', environment.ContactAPI.AzureToken),
  };

  GetPaginatedContact(params: any) {
    return this.http
      .post<any>(
        `${environment.ContactAPI.URL}/api/contact/GetPaginatedContact`,
        params,
        this.httpOptions,
      )
      .pipe(
        map((response) => {
          console.log('CreateContact response:', response);
          response.result.forEach((item: any) => {
            if (item.activeStatus === 1) {
              item.status = 'Active';
            } else if (item.activeStatus === 0) {
              item.status = 'Inactive';
            }
          });
          return response;
        }),
        catchError((error) => {
          console.error('Error creating Contact.', error);
          return of(null);
        }),
      );
  }

  GetContactById(id: number) {
    return this.http
      .get<any>(`${environment.ContactAPI.URL}/api/contact/GetContactById/${id}`, this.httpOptions)
      .pipe(
        map((response) => {
          console.log('GetContactById response:', response);
          // var contact = <Contact[]>response.result;
          return response;
        }),
        catchError((error) => {
          console.error('Error getting contact by id:', error);
          return of(null);
        }),
      );
  }
}
