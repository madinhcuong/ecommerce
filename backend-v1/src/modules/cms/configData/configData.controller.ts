import { Request, Response } from "express";
import ConfigDataService from "./configData.service";
import {
  responseOk,
  responseError,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  // getCache,
  // setCache,
  // createES,
  // searchES,
} from "../../../helpers";

class UserController {
  static async getListUsers(req: Request, res: Response) {
    try {
      let { search } = req.query;
      let configRedisKey = req.route.path;

      if (search) {
        //   let dataSearch = await searchES("configrediskey", { search: search });
        //   if (dataSearch.length > 0) return responseOk(res, dataSearch);
        //   await createES("configrediskey", "1", { search: search });
        // }
        // let dataCache = await getCache(configRedisKey);
        // if (dataCache) return responseOk(res, dataCache);
        // let dataConfig = await ConfigDataService.getData();
        // if (dataConfig) await setCache(configRedisKey, dataConfig);
      }

      let dataConfig = null;

      return responseOk(res, dataConfig);
    } catch (err: any) {
      console.log("err.message", err.message);
      return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
    }
  }
}

export default UserController;
