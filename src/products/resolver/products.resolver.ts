import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from '../service/products.service';
import { Product } from '../entity/product.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ProductDTO } from '../dto/query-product.dto';
import { CreateProductInput } from '../dto/create-product.dto';
import {
  Pagination,
  ResponseWithPaginationInfoProduct,
} from 'src/shared/pagination.dto';

@ApiTags('products')
@Resolver(() => ProductDTO)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => ResponseWithPaginationInfoProduct)
  async getProducts(
    @Args('pagination', { type: () => Pagination, nullable: true })
    pagination: Pagination,
  ): Promise<ResponseWithPaginationInfoProduct> {
    const { page, limit } = pagination;

    const result = await this.productsService.findAll(page, limit);

    return {
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ProductDTO])
  async getTotalSalesByCategory(): Promise<any[]> {
    return this.productsService.getTotalSalesByCategory();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductDTO)
  @ApiResponse({ status: 201, description: 'Product added successfully.' })
  async addProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductDTO> {
    const product = await this.productsService.create(
      input.name,
      input.price,
      input.category,
    );
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductDTO)
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  async updateProduct(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('category') category: string,
  ): Promise<ProductDTO> {
    return this.productsService.update(id, name, price, category);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  async deleteProduct(@Args('id') id: number): Promise<boolean> {
    return this.productsService.delete(id);
  }
}
