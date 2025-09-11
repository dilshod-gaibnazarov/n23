import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/core/entity/admin.entity';
import type { AdminRepository } from 'src/core/repository/admin.repository';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Roles } from 'src/common/enum';
import { config } from 'src/config';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { successRes } from 'src/infrastructure/response/success';
import { TokenService } from 'src/infrastructure/token/Token';
import { IToken } from 'src/infrastructure/token/interface';
import { Response } from 'express';

@Injectable()
export class AdminService
  extends BaseService<CreateAdminDto, UpdateAdminDto, AdminEntity>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepo: AdminRepository,
    private readonly crypto: CryptoService,
    private readonly tokenService: TokenService,
  ) {
    super(adminRepo);
  }

  async onModuleInit(): Promise<void> {
    try {
      const existsSuperadmin = await this.adminRepo.findOne({
        where: { role: Roles.SUPERADMIN },
      });
      const hashedPassword = await this.crypto.encrypt(config.ADMIN_PASSWORD);
      if (!existsSuperadmin) {
        const superadmin = this.adminRepo.create({
          username: config.ADMIN_USERNAME,
          hashed_password: hashedPassword,
          role: Roles.SUPERADMIN,
        });
        await this.adminRepo.save(superadmin);
        console.log('Super admin created successfully');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error on creaeting super admin');
    }
  }

  async createAdmin(creteAdminDto: CreateAdminDto) {
    const { username, password } = creteAdminDto;
    const existsUsername = await this.adminRepo.findOne({
      where: { username },
    });
    if (existsUsername) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await this.crypto.encrypt(password);
    const newAdmin = this.adminRepo.create({
      username,
      hashed_password: hashedPassword,
    });
    await this.adminRepo.save(newAdmin);
    return successRes(newAdmin, 201);
  }

  async signIn(signInDto: CreateAdminDto, res: Response) {
    const { username, password } = signInDto;
    const admin = await this.adminRepo.findOne({ where: { username } });
    const isMatchPassword = await this.crypto.decrypt(
      password,
      admin?.hashed_password || '',
    );
    if (!admin || !isMatchPassword) {
      throw new BadRequestException('Username or password incorrect');
    }
    const payload: IToken = {
      id: admin.id,
      isActive: admin.is_active,
      role: admin.role,
    };
    const accessToken = await this.tokenService.accessToken(payload);
    const refreshToken = await this.tokenService.refreshToken(payload);
    await this.tokenService.writeCookie(res, 'adminToken', refreshToken, 15);
    return successRes({ token: accessToken });
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto, user: IToken) {
    const { username, password, is_active } = updateAdminDto;
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    if (username) {
      const existsUsername = await this.adminRepo.findOne({
        where: { username },
      });
      if (existsUsername && existsUsername.id !== id) {
        throw new ConflictException('Username already exists');
      }
    }
    let hashedPassword = admin?.hashed_password;
    let isActive = admin.is_active;
    if (user.role === Roles.SUPERADMIN) {
      if (password) {
        hashedPassword = await this.crypto.encrypt(password);
      }
      if (is_active) {
        isActive = is_active;
      }
    }
    await this.adminRepo.update(
      { id },
      { username, is_active: isActive, hashed_password: hashedPassword },
    );
    return this.findOneById(id);
  }
}
