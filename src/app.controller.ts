import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCategoriaDto } from './dtos/create-categoria.dto';

@Controller("api/v1/")
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:b53yS3k8XVrY@54.173.1.69:5672/smartranking'],
        queue: 'admin-backend'
      }
    })
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto){
    this.clientAdminBackend.emit('create-categoria', createCategoriaDto)
  }

  @Get('categorias')
  getCategorias(@Query('categoria') categoria: string): Observable<any>{
    return this.clientAdminBackend.send('get-categorias', categoria ? categoria : '')
  }

}
