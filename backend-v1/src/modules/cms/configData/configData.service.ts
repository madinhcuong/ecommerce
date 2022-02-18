// import ConfigDataModel from "./configData.model";
class ConfigDataService {
  static async countDocuments() {
    // return ConfigDataModel.countDocuments().exec();
  }

  static async getData() {
    // return ConfigDataModel.find();
  }

  static async create(data: any) {
    // return new ConfigDataModel(data).save();
  }
}

export default ConfigDataService;
