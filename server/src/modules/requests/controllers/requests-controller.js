import logger from '../../../lib/logger';
import {
  HTTP_CODES,
  LOGGER,
  MESSAGES,
  RESPONSE_SUCCESS,
} from '../../../lib/constants';
import { CommonResponse } from '../../../lib/utils';

export async function create(req, res) {
  let response;
  try {
    logger.log(LOGGER.INFO, MESSAGES.REQUEST_CREATE_API_START);
    const payload = {};
    // const user = await requestService.create(payload);
    response = CommonResponse(
      RESPONSE_SUCCESS.TRUE,
      payload,
      'Request created successfully',
      null
    );
    res.status(HTTP_CODES.OK).json(response);
    logger.log(
      LOGGER.INFO,
      MESSAGES.REQUEST_CREATE_API_SUCCESS + JSON.stringify(response)
    );
  } catch (e) {
    logger.log(LOGGER.ERROR, MESSAGES.REQUEST_CREATE_API_FAILED);
    response = CommonResponse(RESPONSE_SUCCESS.FALSE, null, e, e);
    res.status(HTTP_CODES.BAD_REQUEST).json(response);
  }
}
