// src/products/products.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete,HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';

@Controller('api/v1/products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201) // Set the HTTP status code to 201 Created
  async create(@Body() product: Product) {
    const createdProduct = await this.productsService.create(product);
    // console.log('Product created successfully:', createdProduct);  
    return { message: 'Product created successfully', data: createdProduct };
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.update(id, product);
  }
  @Delete(':id')
  @HttpCode(201)
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return { message: 'Product deleted successfully' };
  }
}
