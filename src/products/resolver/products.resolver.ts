import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from '../service/products.service';
import { Product } from '../entity/product.entity';
import { ApiTags, ApiResponse,ApiOperation,ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/jwt-auth.guard';
import { ProductDTO } from '../dto/query-product.dto';
import { CreateProductInput } from '../dto/mutation-product.dto';
import {
  Pagination,
  ResponseWithPaginationInfoProduct,
} from 'src/shared/pagination.dto';

@ApiTags('products')
@Resolver(() => ProductDTO)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}


  /*---------------------------------------- Query ---------------------------------------- */
  @UseGuards(AuthGuard)
  @Query(() => ResponseWithPaginationInfoProduct)
  @ApiResponse({ status: 201, description: 'Will return all products with pagination info' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all product with pagination' })
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

  
  @UseGuards(AuthGuard)
  @Query(() => [ProductDTO])
  @ApiResponse({ status: 201, description: 'Will return total sales and total sold products quantities by category' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get total sales by category' })
  async getTotalSalesByCategory(): Promise<any[]> {
    return this.productsService.getTotalSalesByCategory();
  }


  /*---------------------------------------- Mutations ---------------------------------------- */
  @UseGuards(AuthGuard)
  @Mutation(() => ProductDTO)
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add new product' })
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

  @UseGuards(AuthGuard)
  @Mutation(() => ProductDTO)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  async updateProduct(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('category') category: string,
  ): Promise<ProductDTO> {
    return this.productsService.update(id, name, price, category);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  async deleteProduct(@Args('id') id: number): Promise<boolean> {
    return this.productsService.delete(id);
  }
}
