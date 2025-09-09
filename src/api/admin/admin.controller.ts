import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import type { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { adminData } from 'src/common/document/swagger';
import { CookieGetter } from 'src/common/decorator/cookie-getter.decorator';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Create admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin created',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: adminData,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Failed creating admin',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'Username already exists',
        },
      },
    },
  })
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)
  @Post()
  @ApiBearerAuth()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({
    summary: 'Sign in admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin sign in',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          token: 'lkasdfjaskldjfasdifjm2ohnkb42309judsfkanfoasdjf',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'Refresh token expired',
        },
      },
    },
  })
  @Post('signin')
  signin(
    @Body() signInDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(signInDto, res);
  }

  @ApiOperation({
    summary: 'Get new access token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New access token get successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          token: 'aslksfjo2i3n4n2309idsfn2i3jo423lj423kj',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'Refresh token expired',
        },
      },
    },
  })
  @Post('token')
  newToken(@CookieGetter('adminToken') token: string) {
    return this.authService.newToken(this.adminService.getRepository, token);
  }

  @ApiOperation({
    summary: 'Sign out admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin signed out successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'Unauthorized',
        },
      },
    },
  })
  @Post('signout')
  signOut(
    @CookieGetter('adminToken') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(
      this.adminService.getRepository,
      token,
      res,
      'adminToken',
    );
  }

  @ApiOperation({
    summary: 'Get all admins',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All admins get successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            ...adminData,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error on get admins',
    schema: {
      example: {
        statusCode: 500,
        error: {
          message: 'Internal server error',
        },
      },
    },
  })
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.adminService.findAll({
      where: { role: Roles.ADMIN },
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        username: true,
        is_active: true,
      },
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
