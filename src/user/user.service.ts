import { FilterUserDto } from './dto/filter.user.dto';
import { Utils } from './../helper/utils';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/product/dto/product.enum';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = this.userRepository.create(createUserDto)

    user.name = Utils.getInstance().validName(user.name)
    user.password = await Utils.getInstance().encryptPassword(user.password)

    user.isActive = true

    const isRegistered = await this.findByName(user.name.toUpperCase())

    if (isRegistered) {
      throw new BadRequestException(`Usuário: ${user.name.toUpperCase()} já foi registrado!`)
    }

    

    return this.userRepository.save(user);
  }

  async findAll(filter: FilterUserDto): Promise<Pagination<User>> {

    const queryBuilder = this.userRepository.createQueryBuilder('inf')
    const { name, orderBy, sort } = filter

    if (name) {
      return paginate<User>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` }), filter
      )
    }

    if (orderBy == SortingType.ID) {
      console.log('entrou no id')
      queryBuilder.orderBy('inf.id', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
    } else if (orderBy == SortingType.DATE) {
      console.log('entrou na data')
      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
    } else {
      console.log('entrou no nome')
      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
    }

    return paginate<User>(queryBuilder, filter)
  }

  async findByName(name: string): Promise<User> {
    return await this.userRepository.findOne({ name: name })
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    updateUserDto.password = await Utils.getInstance().encryptPassword(updateUserDto.password)

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })

    if (!user) {
      throw new NotFoundException(`Usuário dom id: ${id} não foi encontrado.`)
    }

    user.name = user.name.toUpperCase()

    this.userRepository.save(user)

    return this.findOne(id)
  }

  async remove(id: number) {

    const user = await this.userRepository.findOne({ id })

    if (!user) {
      throw new NotFoundException(`Usuário dom id: ${id} não foi encontrado.`)
    }

    return this.userRepository.remove(user)
  }
}
