import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class AppService {
  private sharedValues = [];
  private message = new Subject<any>();
  TempArray = [];
  CheckBoxValues = [];
  public observedMessage$ = this.message.asObservable();

  constructor(
    private _http: HttpClient) {
  }


  /**********************Shared Variable********************** */

  public setValue(prop: string, value: any) { 
    if (this.sharedValues.length > 0) {
      for (let j = 0; j < this.sharedValues.length; j++) {
        if (this.sharedValues[j].name === prop) {
          this.sharedValues[j].value = value;
        } else {
          this.sharedValues.push({
            name: prop,
            value: value
          });
        }
      }
    } else {
      this.sharedValues.push({
        name: prop,
        value: value
      });
    }
  }

  getValue(prop: string) {
    function remove_duplicates(objectsArray) {
      const usedObjects = {};
      for (let i = objectsArray.length - 1; i >= 0; i--) {
        const so = JSON.stringify(objectsArray[i]);
        if (usedObjects[so]) {
          objectsArray.splice(i, 1);
        } else {
          usedObjects[so] = true;
        }
      }
      return objectsArray;
    }
    this.sharedValues = remove_duplicates(this.sharedValues);
    for (let i = 0; i < this.sharedValues.length; i++) {
      if (this.sharedValues[i].name === prop) {
        return this.sharedValues[i].value;
      }
    }
  }

  removeDuplicateElements(obj: any, prop: string) {
    return obj.filter((data, index, self) =>
      index === self.findIndex((item) => (
        item[prop] === data[prop]
      ))
    );
  }

  /*************End************* */

  /**********************Primeng Message**************************/

  broadcastMessage(msg) {
    this.message.next(msg);
  }

  clearMessage() {
    
  }

  /**********************End**************************/

  /**********************API Calls**************************/

  getToken(url: string, data): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = { headers: headers };
    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', data.username);
    params = params.append('password', data.password);

    return this._http.post(url, params, options)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  get(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const options = { headers: headers };
    return this._http.get(url, options)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  post(url: string, data): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const options = { headers: headers };
    const body = data;

    return this._http.post(url, body, options)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  postFile(url, file): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const options = { headers: headers };
    const formData: FormData = new FormData();
    formData.append('importedFile', file);
    return this._http.post(url, formData, options)
      .pipe(
        map(result => {
          return result;
        })
      );
  }


  //Common Method for getting checkbox values with Entity Name

  GetCheckBoxValues(value , Entity ) {

    let index = this.TempArray.indexOf(value)
    if (index == -1) {
      this.TempArray.push(value);
    }
    else if (index > -1) {
      this.TempArray.splice(index, 1);
    }
    let result = [];
    for (let i = 0; i < this.TempArray.length; i++) {
      result[i] = { [Entity]: this.TempArray[i] };
    }
    this.CheckBoxValues = result;
    return this.CheckBoxValues;
  }

}
