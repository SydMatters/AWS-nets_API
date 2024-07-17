import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('create')
  @ApiHeader({
    name: 'codrr_token',
    description: 'Token de autenticación'
  })
  @ApiResponse({
    status: 201,
    description: 'Proyecto creado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @AdminAccess()
  @Get('all')
  @ApiHeader({
    name: 'codrr_token',
    description: 'Token de autenticación'
  })
  @ApiResponse({
    status: 200,
    description: 'Proyectos encontrados exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.'
  })
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':projectId')
  @ApiParam({
    name: 'projectId',
    description: 'ID del proyecto'
  })
  @ApiHeader({
    name: 'codrr_token',
    description: 'Token de autenticación'
  })
  @ApiResponse({
    status: 200,
    description: 'Proyecto encontrado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta.'
  })
  @ApiResponse({
    status: 404,
    description: 'Proyecto no encontrado.'
  })
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.findProjectById(id);
  }

  @Put('edit/:projectId')
  @ApiParam({
    name: 'projectId',
    description: 'ID del proyecto'
  })
  @ApiHeader({
    name: 'codrr_token',
    description: 'Token de autenticación'
  })
  @AccessLevel('OWNER')
  @ApiResponse({
    status: 200,
    description: 'Proyecto actualizado exitosamente.',
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
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  
  @Delete('delete/:projectId')
  @ApiParam({
    name: 'projectId',
    description: 'ID del proyecto'
  })
  @ApiHeader({
    name: 'codrr_token',
    description: 'Token de autenticación'
  })
  @AccessLevel('OWNER')
  @ApiResponse({
    status: 200,
    description: 'Proyecto eliminado exitosamente.',
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
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.deleteProject(id);
  }
}
