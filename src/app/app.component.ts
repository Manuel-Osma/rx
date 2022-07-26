import { Component } from '@angular/core';
import { PeticionEnvio, ResponseG } from './interfaces/models.interfaces';
import { ServiceService } from './service/service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rx'
  peticion = new PeticionEnvio();
  peticionPut = new PeticionEnvio();
  resultado!: Array<ResponseG>;
  id: number = 1;
  constructor(private phttp: ServiceService) {
    this.guardar()
   }
   guardar(){
    localStorage.setItem('items', JSON.stringify(ResponseG))
   }
  onSubmit(tipo: number) {
    switch ( tipo ) {
      case 1:
      this.postSentServices(this.peticion);
      break;
      case 2:
      if(this.peticionPut.author == null && this.peticionPut.title == null){
        alert("llene todo los campos de put");

      }else{
        this.putSentServices(this.peticionPut, this.id);
      }
      break;
    }
}
onchange($event) {
  this.id = $event.target.value;

}


  getPeticion() {
    this.phttp.getRespuesta().subscribe(
      data => {
        this.resultado = data;
        localStorage.setItem('datos', JSON.stringify(this.resultado))
      },
      err => {
        console.log(err);
      }
    );
  }

  postSentServices(body: PeticionEnvio) {
    this.phttp.postRespuesta(body).subscribe(
      data => {
        this.resultado = [];
        this.resultado.push(data);
      }
    )

  }
  putSentServices(body: PeticionEnvio, id: number) {
    this.phttp.putRespuesta(id, body).subscribe(
      data => {
        this.resultado = [];
        this.resultado.push(data);
      }
    )
  }

  deleteItem(index:number){
    this.resultado.splice(index,1)
    localStorage.setItem('datos', JSON.stringify(this.resultado))
    JSON.parse(localStorage.getItem('datos'))
  }
}
