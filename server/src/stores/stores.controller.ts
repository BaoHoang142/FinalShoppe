import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('api/v1/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get("search")
  async searchUser(@Query('key') key: any) {
    return this.storesService.searchStore(key);
  }
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Patch("admin/statusAdmin/:id")
  updateStatusAdmin(@Param('id') id: string,@Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStatusAdmin(+id,updateStoreDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
