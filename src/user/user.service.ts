import { FilterUserDto } from './dto/filter.user.dto';
import { Utils } from './../helper/utils';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto):Promise<User> {

    const user = this.userRepository.create(createUserDto)
    user.createAt = new Utils().getCurrentDate()
    user.name = user.name.toUpperCase()

    const isRegistered = await this.findByName(user.name.toUpperCase())

    if(isRegistered){
      throw new BadRequestException(`Usuário: ${user.name.toUpperCase()} já foi registrado!`)
    }

    return this.userRepository.save(user);
  }

  async findAll(filter:FilterUserDto):Promise<User | User[]> {

    const { name } = filter

    if(name){
      return this.userRepository.find({
        where:{
          name: Like(`%${name.toUpperCase()}%`)
        }
      })
    }

    return this.userRepository.find()
  }

  async findByName(name:string):Promise<User>{
    return await this.userRepository.findOne({name:name})
  }

  async findOne(id: number) {
    return this.userRepository.findOne({id})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id:id,
      ...updateUserDto
    })

    if(!user){
      throw new NotFoundException(`Usuário dom id: ${id} não foi encontrado.`)
    }

    user.name = user.name.toUpperCase()
    user.updateAt = new Utils().getCurrentDate()

    this.userRepository.save(user)
    
    return this.findOne(id)
  }

  async remove(id: number) {

    const user = await this.userRepository.findOne({id})

    if(!user){
      throw new NotFoundException(`Usuário dom id: ${id} não foi encontrado.`)
    }

    return this.userRepository.remove(user)
  }
}
