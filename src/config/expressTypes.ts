import { Request } from 'express'

export interface TypedRequestBody<BodyType> extends Request {
  body: BodyType
}
