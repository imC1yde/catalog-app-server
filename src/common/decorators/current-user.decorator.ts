import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { IUserPayload } from '@src/common/interfaces/user-payload.interface'

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): IUserPayload => {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context)
    const user: IUserPayload = ctx.getContext().req.user
    return user
  }
)