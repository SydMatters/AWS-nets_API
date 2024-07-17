import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  @ApiHeader({
    name: "codrr_token",
    description: "Token de autenticación"
  })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido registrado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @AdminAccess()
  @Get('all')
  @ApiHeader({
    name: "codrr_token",
    description: "Token de autenticación"
  })
  @ApiResponse({
    status: 200,
    description: 'Usuarios encontrados exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  @ApiParam({
    name: "id",
    description: "ID del usuario"
  })
  @ApiHeader({
    name: "codrr_token",
    description: "Token de autenticación"
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @Post('add-to-project/:projectId')
  @AccessLevel('OWNER')
  @ApiParam({
    name: "projectId",
    description: "ID del proyecto"
  })
  @ApiHeader({
    name: "codrr_token",
    description: "Token de autenticación"
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario agregado al proyecto exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  @ApiResponse({
    status: 404,
    description: 'Proyecto no encontrado.'
  })
  public async addToProject(
    @Body() body: UserToProjectDTO,
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.usersService.relationToProject({
      ...body,
      project: id as unknown as ProjectsEntity,
    });
  }

  @Put('edit/:id')
  @ApiParam({
    name: "id",
    description: "ID del usuario"
  })
  @ApiHeader({
    name: "codrr_token",
    description: "Token de autenticación"
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @Delete('delete/:id')
  @ApiParam({
    name: "id",
    description: "ID del usuario"
  })
  @ApiHeader({
    name: "codrr_token",
    description: "Token de autenticación"
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
