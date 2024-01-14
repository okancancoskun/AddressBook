import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const DEFAULT_TAKE = 20;
const DEFAULT_PAGE = 1;

export const Pagination = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const query = {
    limit: parseInt(request.query.take) || DEFAULT_TAKE,
    skip: 0,
    page: DEFAULT_PAGE,
  };

  if (request.query.page) {
    query.skip = query.limit * (parseInt(request.query.page) - 1);
    query.page = parseInt(request.query.page);
  }

  return query;
});
