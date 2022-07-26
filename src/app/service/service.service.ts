import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionEnvio, ResponseG } from '../interfaces/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url: string = 'http://localhost:3000/posts'
  private ArrayG: Array<ResponseG>;

  constructor(private http: HttpClient) { }

    postRespuesta(_body:PeticionEnvio):Observable<ResponseG>{
      return this.http.post<ResponseG>(this.url,_body)
    }

    getRespuesta():Observable<ResponseG[]>{
      return this.http.get<ResponseG[]>(this.url)
    }

    putRespuesta(_id:number, _body: PeticionEnvio):Observable<ResponseG>{
      let urlcom = this.url + "/" + _id;
      return this.http.put<ResponseG>(urlcom,_body)
    }

}
